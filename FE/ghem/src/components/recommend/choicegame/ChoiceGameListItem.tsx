import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import StarRating from "@components/common/StarRating";
import {
  evaluatedGameStateType,
  evaluatedGameState,
  choiceGameState,
  dbGameState,
  dbGameStateType
} from "@/store/mainState";
import { useRecoilState } from "recoil";

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

function ChoiceGameListItem({app_id, userId, isLoginStatus}: ChoiceGameListItemProps) {

  const [checked, setChecked] = useState<boolean>(false);
  const [evaluatedGame, setEvaluatedGame] = useRecoilState<evaluatedGameStateType[]>(evaluatedGameState);
  const [choiceGame, setChoiceGame] = useRecoilState(choiceGameState);
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [dbGame, setDbGame] = useRecoilState<dbGameStateType[]>(dbGameState)
  const [currentCapsuleImg, setcurrentCapsuleImg] = useState<string>(`https://cdn.cloudflare.steamstatic.com/steam/apps/${app_id}/capsule_616x353.jpg`)

  useEffect(() => {
    if (userId) {
      // console.log(evaluatedGame);
    } else {
      // console.log(choiceGame);
    }
  }, [evaluatedGame]);

  // 비 로그인 시 게임 선택
  const onClickCard = () => {
    setChecked(!checked);
    if (checked === false) {
      setChoiceGame([...choiceGame, app_id]);
    } else if (checked === true) {
      setChoiceGame(choiceGame.filter((game) => game !== app_id));
    }
  };

  // 로그인 시 게임 평점 매기기
  const ratingHandler = (newRating: number) => {
    if (newRating !== 0) {
      setChecked(true);
      if (evaluatedGame.some((obj) => obj.app_id === app_id)) {
        // 평가 수정하는 경우
        setCurrentRating(newRating);
        setEvaluatedGame(evaluatedGame.map((game:evaluatedGameStateType) => {
          return game.app_id === app_id ? { ...game, rating: newRating} : game
        }))
        setDbGame(dbGame.map((game:dbGameStateType) => {
          return game.app_id === app_id ? { ...game, rating: newRating} : game
        }))
      }
      else {
        // 처음 평가하는 경우
        setCurrentRating(newRating);
        setEvaluatedGame([
          ...evaluatedGame,
          { steam_id: userId, app_id: app_id, rating: newRating },
        ]);
        setDbGame([...dbGame,
        {app_id: app_id, rating: newRating, user_id: userId, }])
      }
      }
  };
  // 평가 삭제하는 경우
  const RemoveEvaluated = () => {
    setEvaluatedGame(evaluatedGame.filter((game) =>game.app_id !== app_id))
    setDbGame(dbGame.filter((game) =>game.app_id !== app_id))
    setCurrentRating(0)
    setChecked(!checked)
    console.log(evaluatedGame)
  }

  return (
    <div>
      {isLoginStatus ? (
        <Card key={app_id}>
          <div css={star}>
            <StarRating
              starSize={2}
              currentRating={currentRating}
              ratingHandler={ratingHandler}
              isPromptAvailable={false}
            />
          </div>
          <SelectTmg
            src={currentCapsuleImg}
            alt={`${app_id}`}
            checked={checked}         />

          {checked ? (
            <>
              <button css={removeBtn} onClick={RemoveEvaluated}>평가 취소하기</button>
            </>
          ) : (
            null
          )}
        </Card>
      ) : (
        <Card key={app_id} onClick={onClickCard}>
          <SelectTmg
              checked={checked}
              src={currentCapsuleImg}
              alt={`${app_id}`}         />
        </Card>
      )}
    </div>
  );
}
const Card = styled.div`
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  justify-content: center;
  width: 20rem;
  height: 20rem;
  border: solid 1px  #23152a;
  border-radius: 1rem;
  margin: 1rem;
  background: #23152a;
`;

const SelectTmg = styled.img<{ checked: boolean }>`
  opacity: ${(props) => (props.checked ? 0.3 : 1)};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  object-fit: cover;
  width:18rem;
  margin-top:1rem;
  
`;

const star = css`
  position: absolute;
  margin-top: 13rem;
`;

const removeBtn = css`
  margin-top: 3rem;
  opacity: 1;
`
export default ChoiceGameListItem;
