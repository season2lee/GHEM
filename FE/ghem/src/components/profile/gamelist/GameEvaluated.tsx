import { useState } from "react";
import { css } from "@emotion/react";
import filterIcon from "../../../assets/image/filterIcon.png";
import GameCard from "./GameCard";
import FilterDropdown from "../common/FilterDropdown";
import { mobile } from "@/util/Mixin";
import testGameImage from "../../../assets/image/testGameImage.jpg";

type gameListItem = {
  id: number;
  img: string;
  title: string;
  grade: string;
  review: string;
};

function GameEvaluated() {
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
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const handleOpenFilter = (): void => {
    setIsOpenFilter(!isOpenFilter);
  };

  return (
    <div css={gameEvaluatedWrapper}>
      <div css={headerWrapper}>
        <h4>
          평가했어요 <span>(10)</span>
        </h4>
        <div css={filterWrapper} onClick={handleOpenFilter}>
          <span>필터</span>
          <img src={filterIcon} alt="필터 아이콘" />
          {isOpenFilter && <FilterDropdown />}
        </div>
      </div>
      <div css={gameCardWrapper}>
        {gameList.map((game, idx) => (
          <GameCard key={idx} game={game} />
        ))}
      </div>
    </div>
  );
}

const gameEvaluatedWrapper = css`
  width: auto;
  padding: 40px;
  background: #352c42;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 50px;

  ${mobile} {
    padding: 30px;
  }
`;

const headerWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;

  > h4 > span {
    font-weight: normal;
    font-size: 18px;
  }

  ${mobile} {
    > h4 {
      font-size: 20px;
    }

    > h4 > span {
      font-size: 16px;
    }
  }
`;

const filterWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  position: relative;

  :hover {
    transition: all 0.5s;
    color: #c9c9c9;
  }

  > img {
    width: 24px;
    height: 24px;
    margin-left: 5px;
  }

  ${mobile} {
    > span {
      font-size: 16px;
    }

    > img {
      width: 20px;
      height: 20px;
    }
  }
`;

const gameCardWrapper = css`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`;

export default GameEvaluated;
