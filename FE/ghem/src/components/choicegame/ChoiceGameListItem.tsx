import React, { useState, useEffect, useCallback,useLayoutEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import StarRating from "@components/gamedetail/imagehead/StarRating";
import { evaluatedGameStateType, evaluatedGameState } from "@/store/mainState";
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
  const [evaluatedGame, setEvaluatedGame] =useRecoilState<evaluatedGameStateType[]>(evaluatedGameState);
  const [currentRating, setCurrentRating] = useState<number>(0);

  useEffect(()=>{
    setCurrentRating(currentRating)
    if (currentRating !== 0){
      if (userId) {
        setEvaluatedGame([
          ...evaluatedGame,
          {
            app_id: app_id,
            rating: currentRating,
          },
        ]);  
      } else {
        setEvaluatedGame([
          {
            app_id: app_id,
            rating: 5,
          },
        ]);
      }
    }
   
  },[checked])
  const onClickCard = () => {
    setChecked(true);
    
  };

  return (
    <div>
      {isLoginStatus ? (
        <Card onClick={onClickCard} checked={checked}>
          <img
            css={selectTmg}
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${app_id}/hero_capsule.jpg`}
            alt={`${app_id}`}
          />
          <StarRating
            starSize={2}
            currentRating={currentRating}
            setCurrentRating={setCurrentRating}
          />
        </Card>
      ) : (
        <Card onClick={onClickCard} checked={checked}>
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
