import { css } from "@emotion/react";
import React from "react";
import CommonGameList from "./game/CommonGameList";

// type CommonGameListProps = {
//     gameType?: "discount" | "steady";
//     gameList?: GameList[];
//     imgType: "header" | "capsule";
//     scrollType: -1 | 1;
//     setAppid: React.Dispatch<React.SetStateAction<number | null>>;
//     setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
//     setColId: React.Dispatch<React.SetStateAction<string>>;
//     setPageXY: React.Dispatch<React.SetStateAction<PageXY>>;
//     colId: string;
//     currentColId: string;
//   };

function BannerTwo() {
  return (
    <div>
      <span css={recommendText}>LIKE YOU LIKE</span>
      {/* <CommonGameList /> */}
    </div>
  );
}

const recommendText = css`
  color: #fff;
  font-size: 60px;
  text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 7px #f6b4ff,
    0 0 10px #f1c1ff, 0 0 15px #ffd8f8, 0 0 18px #eb68ff, 0 0 23px #ffa9cb;
`;

export default BannerTwo;
