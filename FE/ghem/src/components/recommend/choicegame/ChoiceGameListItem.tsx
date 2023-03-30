import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import StarRating from "@components/common/StarRating";
import {
  evaluatedGameStateType,
  evaluatedGameState,
  choiceGameState,
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

function ChoiceGameListItem({
  app_id,
  userId,
  isLoginStatus,
}: ChoiceGameListItemProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [evaluatedGame, setEvaluatedGame] =
    useRecoilState<evaluatedGameStateType[]>(evaluatedGameState);
  const [choiceGame, setChoiceGame] = useRecoilState(choiceGameState);
  const [currentRating, setCurrentRating] = useState<number>(0);

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
    console.log(app_id)
    if (newRating !== 0) {
      setChecked(true);
      if (evaluatedGame.some((obj) => obj.app_id === app_id)) {
        // 평가 수정하는 경우
        setCurrentRating(newRating);
        setEvaluatedGame(evaluatedGame.map((game:evaluatedGameStateType) => {
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

      }
      }
  };
  // 평가 삭제하는 경우
  const RemoveEvaluated = () => {
    setEvaluatedGame(evaluatedGame.filter((game) =>game.app_id !== app_id))
    setCurrentRating(0)
    setChecked(!checked)
    console.log(evaluatedGame)
  }

  return (
    <div>
      {isLoginStatus ? (
        <Card key={app_id} checked={checked}>
          <div css={star}>
            <StarRating
              starSize={2}
              currentRating={currentRating}
              ratingHandler={ratingHandler}
            />
          </div>
          <img
            css={selectTmg}
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${app_id}/hero_capsule.jpg`}
            alt={`${app_id}`}
          />

          {checked ? (
            <>
              <button onClick={RemoveEvaluated}>평가 취소하기</button>
            </>
          ) : (
            <></>
          )}
        </Card>
      ) : (
        <Card key={app_id} onClick={onClickCard} checked={checked}>
          <img
            css={selectTmg}
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${app_id}/hero_capsule.jpg`}
            alt={`${app_id}`}
          />
        </Card>
      )}
    </div>
  );
}
const Card = styled.div<{ checked: boolean }>`
  opacity: ${(props) => (props.checked ? 0.3 : 1)};
`;

const selectTmg = css`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const star = css`
  position: absolute;
  margin-left: 5rem;
  margin-top: 10rem;
`;
export default ChoiceGameListItem;
