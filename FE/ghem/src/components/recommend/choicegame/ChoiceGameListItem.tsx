import React, {useState,useEffect,} from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import StarRating from "@components/common/StarRating";
import {evaluatedGameStateType,evaluatedGameState,choiceGameState} from "@/store/mainState";
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

function ChoiceGameListItem({app_id,userId,isLoginStatus,}: ChoiceGameListItemProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [evaluatedGame, setEvaluatedGame] = useRecoilState<evaluatedGameStateType[]>(evaluatedGameState);
  const [choiceGame, setChoiceGame] = useRecoilState(choiceGameState);
  const [currentRating, setCurrentRating] = useState<number>(0);

  useEffect(() => {
    if (userId) {
      // console.log(evaluatedGame);
    } else {
      // console.log(choiceGame);
    }
  }, [checked]);

  // 비 로그인 시 게임 선택 
  const onClickCard = () => {
    setChecked(!checked);
      if (checked === false) {
        setChoiceGame([...choiceGame, app_id]);
      } else if( checked === true) {
        setChoiceGame(choiceGame.filter((game) => game !== app_id))
      }
  };

  // 평점 매길 때 사용
  const ratingHandler = (newRating: number) => {
    // 평가 된 경우
    if (newRating !== 0) {
      setCurrentRating(newRating);
      setEvaluatedGame([...evaluatedGame,{app_id: app_id, rating: newRating},]);
    }
  };

  return (
    <div>
      {isLoginStatus ? (
        <Card key={app_id} checked={choiceGame.includes(app_id)? true:false}>
          <img
            onClick={onClickCard}
            css={selectTmg}
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${app_id}/hero_capsule.jpg`}
            alt={`${app_id}`}
          />
          <StarRating
            starSize={2}
            currentRating={currentRating}
            ratingHandler={ratingHandler}
          />
          {checked ? (
            <>
              <button>평가 취소하기</button>
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

export default ChoiceGameListItem;
