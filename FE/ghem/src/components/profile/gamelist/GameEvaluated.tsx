import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import filterIcon from "../../../assets/image/filterIcon.png";
import FilterDropdown from "../common/FilterDropdown";
import { mobile } from "@/util/Mixin";
import GameCard from "./GameCard";
import { getEvaluatedGameList } from "@/api/gamelist";
import { gameListType } from "gameList";
import GameNoneList from "./GameNoneList";

function GameEvaluated() {
  const userId: number | null = Number(localStorage.getItem("id"));
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollElement = scrollRef.current;
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [gameList, setGameList] = useState<gameListType[]>([]);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [isDragMove, setIsDragMove] = useState<boolean>(false);

  const handleOpenFilter = (): void => {
    setIsOpenFilter(!isOpenFilter);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDrag(true);
    setStartX(e.pageX);
    setIsDragMove(false);
  };

  const handleDragEnd = () => {
    setIsDrag(false);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (isDrag) {
      e.preventDefault();
      if (scrollElement) {
        scrollElement.scrollLeft += startX - e.pageX;
      }
      setStartX(e.pageX);
      setIsDragMove(true);
    }
  };

  const getEvaluatedGameListFunc = async (userId: number) => {
    const response = await getEvaluatedGameList(userId);

    if (response) {
      setGameList(response.Estimate_List);
    }
  };

  useEffect(() => {
    if (userId) {
      getEvaluatedGameListFunc(userId);
    }
  }, [userId]);

  return (
    <div css={gameEvaluatedWrapper}>
      <div css={headerWrapper}>
        <h4>
          평가했어요 <span>({gameList.length})</span>
        </h4>
        <div css={filterWrapper} onClick={handleOpenFilter}>
          <span>필터</span>
          <img src={filterIcon} alt="필터 아이콘" />
          {isOpenFilter && <FilterDropdown />}
        </div>
      </div>
      {gameList.length ? (
        <div
          css={gameCardWrapper}
          ref={scrollRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
        >
          {gameList.map((list, idx) => (
            <GameCard
              key={list.userGame.userGameId}
              userGameId={list.userGame.userGameId}
              game={list.userGame.game}
              rating={list.userGame.rating}
              review={list.content}
              isDragMove={isDragMove}
            />
          ))}
        </div>
      ) : (
        <GameNoneList path="평가" />
      )}
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

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GameEvaluated;
