import { useState } from "react";
import { css } from "@emotion/react";
import GameCard from "./GameCard";
import { mobile } from "@/util/Mixin";
import testGameImage from "../../../assets/image/testGameImage.jpg";

type gameListItem = {
  id: number;
  img: string;
  title: string;
  grade: string;
  review: string;
};

function GameInterested() {
  const [gameList, setGameList] = useState<gameListItem[]>([
    {
      id: 1,
      img: testGameImage,
      title: "카트라이더1",
      grade: "5점",
      review: "이 게임 진짜 재밌어요",
    },
    {
      id: 2,
      img: testGameImage,
      title: "카트라이더2",
      grade: "5점",
      review: "이 게임 진짜 재밌어요",
    },
    {
      id: 3,
      img: testGameImage,
      title: "카트라이더3",
      grade: "5점",
      review: "이 게임 진짜 재밌어요",
    },
    {
      id: 4,
      img: testGameImage,
      title: "카트라이더4",
      grade: "5점",
      review: "이 게임 진짜 재밌어요",
    },
    {
      id: 5,
      img: testGameImage,
      title: "카트라이더5",
      grade: "5점",
      review: "이 게임 진짜 재밌어요",
    },
  ]);

  return (
    <div css={gameInterestedWrapper}>
      <h4>
        찜했어요 <span>(20)</span>
      </h4>
      <div css={gameCardWrapper}>
        {gameList.map((game, idx) => (
          <GameCard key={idx} game={game} path="interest" />
        ))}
      </div>
    </div>
  );
}

const gameInterestedWrapper = css`
  width: auto;
  padding: 40px;
  background: #352c42;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  > h4 {
    margin-bottom: 25px;
  }

  > h4 > span {
    font-weight: normal;
    font-size: 18px;
  }

  ${mobile} {
    padding: 30px;

    > h4 {
      font-size: 20px;
    }

    > h4 > span {
      font-size: 16px;
    }
  }
`;

const gameCardWrapper = css`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`;

export default GameInterested;
