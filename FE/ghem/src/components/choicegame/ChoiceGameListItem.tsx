import React, { useState, SetStateAction } from "react";
import { css } from "@emotion/react";

type ChoiceGameListItemProps = {
  appid: number;
  imgType: "header" | "capsule";
  setData: React.Dispatch<SetStateAction<number[]>>;
  data: number[];
};

function ChoiceGameListItem({ appid, imgType,setData,data }: ChoiceGameListItemProps) {

  const Clickhandler = () => {
    setData([...data,appid])
  }

  return (
    <div onClick={Clickhandler}>
      {imgType === "capsule" && (
        <img
          css={selectTmg}
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/hero_capsule.jpg`}
          alt={`${appid}`}
        />
      )}
    </div>
  );
}
const selectTmg = css`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export default ChoiceGameListItem;
