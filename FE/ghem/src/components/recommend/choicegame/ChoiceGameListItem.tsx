import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import StarRating from "@components/common/StarRating";
import {
  evaluatedGameStateType,
  evaluatedGameState,
  choiceGameState,
  dbGameState,
  dbGameStateType,
} from "@/store/mainState";
import { useRecoilState } from "recoil";
import axios from "axios";
import Header from "@/assets/image/header.jpg";
import { mobile } from "@/util/Mixin";

type ChoiceGameListItemProps = {
  app_id: number;
  userId: number;
  isLoginStatus: boolean;
  genre: string;
  nagative_reviews: number;
  positive_reviews: number;
  rating: number;
  rating_desc: string;
  release_date: string;
  title: string;
};

function ChoiceGameListItem({
  app_id,
  userId,
  isLoginStatus,
  genre,
  title,
  release_date,
}: ChoiceGameListItemProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [evaluatedGame, setEvaluatedGame] =
    useRecoilState<evaluatedGameStateType[]>(evaluatedGameState);
  const [choiceGame, setChoiceGame] = useRecoilState(choiceGameState);
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [dbGame, setDbGame] = useRecoilState<dbGameStateType[]>(dbGameState);
  const [currentCapsuleImg, setcurrentCapsuleImg] = useState<string>(
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${app_id}/header.jpg`
  );
  const [flipped, setFlipped] = useState(false);
  const genreList = genre.split("/");
  const genreArray = []
  if (genreList.length > 3) {
    genreArray.push(genreList[0])
    genreArray.push(genreList[1])
    genreArray.push(genreList[2])
    genreArray.push("...")
  }
  else{
    genreArray.push(genreList[0])
    genreArray.push(genreList[1])
    genreArray.push(genreList[2])
  }

  const handleClick = () => {
    setFlipped(!flipped);
    setChecked(!checked);
    if (userId) {
    } else {
      if (checked === false) {
        setChoiceGame([...choiceGame, app_id]);
      } else if (checked === true) {
        setChoiceGame(choiceGame.filter((game) => game !== app_id));
      }
    }
  };

  useEffect(() => {
    ImgApi();
  }, []);

  useEffect(() => {
    if (userId) {
      // console.log(evaluatedGame);
    } else {
      // console.log(choiceGame);
    }
  }, [evaluatedGame]);

  // 비 로그인 시 게임 선택

  // 로그인 시 게임 평점 매기기
  const ratingHandler = (newRating: number) => {
    if (newRating !== 0) {
      setChecked(true);
      setFlipped(true);
      if (evaluatedGame.some((obj) => obj.app_id === app_id)) {
        // 평가 수정하는 경우
        setCurrentRating(newRating);
        setEvaluatedGame(
          evaluatedGame.map((game: evaluatedGameStateType) => {
            return game.app_id === app_id
              ? { ...game, rating: newRating }
              : game;
          })
        );
        setDbGame(
          dbGame.map((game: dbGameStateType) => {
            return game.app_id === app_id
              ? { ...game, rating: newRating }
              : game;
          })
        );
      } else {
        // 처음 평가하는 경우
        setCurrentRating(newRating);
        setEvaluatedGame([
          ...evaluatedGame,
          { steam_id: userId, app_id: app_id, rating: newRating },
        ]);
        setDbGame([
          ...dbGame,
          { app_id: app_id, rating: newRating, user_id: userId },
        ]);
      }
    }
  };
  // 평가 삭제하는 경우
  const RemoveEvaluated = () => {
    setEvaluatedGame(evaluatedGame.filter((game) => game.app_id !== app_id));
    setDbGame(dbGame.filter((game) => game.app_id !== app_id));
    setCurrentRating(0);
    setChecked(!checked);
    console.log(evaluatedGame);
  };

  const ImgApi = async () => {
    try {
      const response = await axios.get(
        `https://cdn.cloudflare.steamstatic.com/steam/apps/${app_id}/header.jpg`
      );
    } catch (err) {
      setcurrentCapsuleImg(Header);
      // console.log(err);
    }
  };

  return (
    <CardContainer key={app_id} onClick={handleClick} checked={checked}>
      {isLoginStatus ? (
        <div className={`card__flipper ${flipped ? "flipped" : ""}`}>
          <CardFront className="card_front">
            <div css={star}>
              <StarRating
                starSize={2}
                currentRating={currentRating}
                ratingHandler={ratingHandler}
                isPromptAvailable={false}
              />
            </div>
            <SelectTmg src={currentCapsuleImg} alt={`${app_id}`} />
          </CardFront>
          <CardBack className="card_back">
            <SelectTmg src={currentCapsuleImg} alt={`${app_id}`} />
            <StarRating
              starSize={2}
              currentRating={currentRating}
              ratingHandler={ratingHandler}
              isPromptAvailable={false}
            />
            {checked ? (
              <>
                <button css={removeBtn} onClick={RemoveEvaluated}>
                  평가 취소하기
                </button>
              </>
            ) : null}
          </CardBack>
        </div>
      ) : (
        <div className={`card__flipper ${flipped ? "flipped" : ""}`}>
          <CardFront key={app_id}>
            <SelectTmg src={currentCapsuleImg} alt={`${app_id}`} />
            <h1 css={text}>{title}</h1>
          </CardFront>
          <CardBack className="card_back">
            <SelectTmg src={currentCapsuleImg} alt={`${app_id}`} />
            <div css={backText}>
              <h3>{title}</h3>
              {genreArray.map((item,index) => {
                return (
                  <div className="genre" key={index}>
                    {item}
                  </div>
                );
              })}
            </div>
          </CardBack>
        </div>
      )}
    </CardContainer>
  );
}

const CardContainer = styled.div<{ checked: boolean }>`
  opacity: ${(props) => (props.checked ? 0.3 : 1)};
  width: 20rem;
  height: 20rem;
  margin: 1rem;
  perspective: 80rem;
  display: inline-block;
  ${mobile}{
    margin: 0;
    width: 10rem;
    height: 10rem;
    margin-bottom:10rem ;

  }
  .card__flipper {
    transition: transform 0.6s ease;
    transform-style: preserve-3d;
    display: flex;
    flex-direction: row;
    background-color: #23152a;
    border-radius: 1rem;
    width: 20rem;
    height: 20rem;
    box-shadow: 0 15px 15px rgb(0 0 0 / 50%);
    ${mobile}{
    margin: 0;
    width: 15rem;
    height: 15rem;
    margin-bottom:2rem ;
  }
   
  }
  .card__front,
  .card__back {
    backface-visibility: hidden;
    display: inline-block;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
  .card__back {
    transform: rotateY(-180deg);
  }
  .card__flipper.flipped {
    transform: rotateY(180deg);
  }

  .card__flipper.flipped .card__back {
    transform: rotateY(0deg);
  }

  .card__flipper.flipped .card__front {
    z-index: 2;
    transform: rotateY(-180deg);
  }

  
`;

const CardFront = styled.div`
  position: absolute;
  display: flex;
  align-items: start;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  background: #23152a;
  backface-visibility: hidden;
  transition: transform 0.6s ease;
`;

const CardBack = styled.div`
  position: absolute;
  border: solid 1px #23152a;
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  background: #23152a;
  backface-visibility: hidden;
  transition: transform 0.6s ease;
  transform: rotateY(180deg);
  text-align: center;
`;

const SelectTmg = styled.img`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  object-fit: cover;
  width: 18rem;
  margin-top: 1rem;
  ${mobile}{
    width: 13.5rem;
  }
`;

const star = css`
  position: absolute;
  margin-top: 10rem;
`;

const removeBtn = css`
  /* margin-top: 3rem; */
  opacity: 1;
  width: 10rem;
  height: 2rem;
  border-radius: 5px;
  padding: 7px 10px;
  border: none;
  color: white;
  background-color: rgb(88, 74, 110);
  cursor: pointer;
  &:hover {
    background-color: rgb(117, 98, 146);
  }
`;
const text = css`
  width: 80%;
  color: #23152a;
  text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45,
    0 0 2px #f6b4ffb9, 0 0 5px #f1c1ff53, 0 0 8px #ffd8f840, 0 0 5px #eb68ffba,
    0 0 5px #ffa9cb3a;
  ${mobile}{
    font-size: 1.5rem;
  }
`;
const backText = css`
  text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45,
    0 0 2px #f6b4ffb9, 0 0 5px #f1c1ff53, 0 0 8px #ffd8f840, 0 0 5px #eb68ffba,
    0 0 5px #ffa9cb3a;
  h3 {
    margin: 1rem;
    ${mobile}{
      margin-top: 0.1rem;
      margin-bottom: 0.8rem;
      font-size: 1rem;
  }
  }

  .genre {
    display:flex;
    justify-content: center;
    margin: 0.2rem;
    margin-top: 0.4rem;
    flex-wrap: wrap;
    flex-direction: row;
    font-size: 0.8rem;
    ${mobile}{
      margin: 0.1rem;
      font-size: 0.4rem;
  }
  }
`;

export default ChoiceGameListItem;
