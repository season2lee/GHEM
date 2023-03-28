import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import GameCard from "./GameCard";
import { mobile } from "@/util/Mixin";
import { getInterestedGameList } from "@/api/gamelist";
import { interestedGameListType } from "gameList";
import GameNoneList from "./GameNoneList";
import { useLocation } from "react-router-dom";

function GameInterested() {
  const location = useLocation();
  const pathnameId = Number(location.pathname.split("/")[2]);
  // const userId: number | null = Number(localStorage.getItem("id"));
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollElement = scrollRef.current;
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [gameList, setGameList] = useState<interestedGameListType[]>([]);
  const [isDragMove, setIsDragMove] = useState<boolean>(false);
  const [isEachFollow, setIsEachFollow] = useState<boolean>(false); // 맞팔인지 확인

  const handleDragStart = (e: React.MouseEvent) => {
    if (!isEachFollow) return;
    setIsDrag(true);
    setStartX(e.pageX);
    setIsDragMove(false);
  };

  const handleDragEnd = () => {
    if (!isEachFollow) return;
    setIsDrag(false);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isEachFollow) return;
    if (isDrag) {
      e.preventDefault();
      if (scrollElement) {
        scrollElement.scrollLeft += startX - e.pageX;
      }
      setStartX(e.pageX);
      setIsDragMove(true);
    }
  };

  const getInterestedGameListFunc = async (userId: number) => {
    const response = await getInterestedGameList(userId);

    if (response) {
      setGameList(response.Dibs_List);
    }
  };

  useEffect(() => {
    getInterestedGameListFunc(pathnameId);
  }, [location]);

  return (
    <div css={gameInterestedWrapper}>
      <h4>
        찜했어요 <span>({gameList.length})</span>
      </h4>
      {gameList.length ? (
        <div
          css={isEachFollow ? gameCardWrapper : blurGameCardWrapper}
          ref={scrollRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
        >
          {gameList.map((list, idx) => (
            <GameCard
              key={list.dibsId}
              dibsId={list.dibsId}
              game={list.game}
              path="interest"
              isDragMove={isDragMove}
              isEachFollow={isEachFollow}
            />
          ))}
        </div>
      ) : (
        <GameNoneList path="찜" />
      )}
    </div>
  );
}

const gameInterestedWrapper = css`
  width: auto;
  padding: 40px;
  background: #352c42;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: relative;

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

  ::-webkit-scrollbar {
    display: none;
  }
`;

const blurGameCardWrapper = css`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  filter: blur(7px);
  pointer-events: none;
  user-select: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GameInterested;
