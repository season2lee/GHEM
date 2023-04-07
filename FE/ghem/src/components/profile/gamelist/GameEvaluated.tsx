import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { mobile } from "@/util/Mixin";
import { getEvaluatedGameList } from "@/api/gamelist";
import { ratingGameListType } from "gameList";
import { BiReset } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import filterIcon from "../../../assets/image/filterIcon.png";
import FilterDropdown from "../common/FilterDropdown";
import GameCard from "./GameCard";
import GameNoneList from "./GameNoneList";
import { getRatingGameList } from "@/api/rating";

function GameEvaluated() {
  const location = useLocation();
  const pathnameId = Number(location.pathname.split("/")[2]);
  // const userId: number | null = Number(localStorage.getItem("id"));
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollElement = scrollRef.current;
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [gameList, setGameList] = useState<ratingGameListType[]>([]);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [isDragMove, setIsDragMove] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<number>(0); // 0: 필터X, 1: 리뷰O, 2: 리뷰X

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
    const response = await getRatingGameList(userId);

    if (response) {
      // 모든 목록
      if (filterType === 0) {
        setGameList(response);
      }
      // 리뷰가 있는 목록
      else if (filterType === 1) {
        const filteredList = response.filter(
          (list: ratingGameListType) => list.content !== null && list.content !== ""
        );
        setGameList(filteredList);
      }
      // 리뷰가 없는 목록
      else if (filterType === 2) {
        const filteredList = response.filter(
          (list: ratingGameListType) => list.content === null || list.content === ""
        );
        setGameList(filteredList);
      }
    }
  };

  useEffect(() => {
    getEvaluatedGameListFunc(pathnameId);
  }, [location, filterType]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpenFilter(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [modalRef]);

  return (
    <div css={gameEvaluatedWrapper}>
      <div css={headerWrapper}>
        <h4>
          평가했어요 <span>({gameList.length})</span>
        </h4>
        {filterType === 0 && (
          <div css={filterWrapper} onClick={handleOpenFilter} ref={modalRef}>
            <span>필터</span>
            <img src={filterIcon} alt="필터 아이콘" />
            {isOpenFilter && <FilterDropdown setFilterType={setFilterType} />}
          </div>
        )}
        {filterType !== 0 && (
          <div css={filterWrapper}>
            {filterType === 1 && <span css={filterTypeSpan}>리뷰 있음 ✅</span>}
            {filterType === 2 && <span css={filterTypeSpan}>리뷰 없음 ❎</span>}
            <BiReset size="25" onClick={() => setFilterType(0)} />
          </div>
        )}
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
              key={list.userGameId}
              userGameId={list.userGameId}
              game={list.game}
              rating={list.rating}
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

  > svg {
    color: #f90808;
    cursor: pointer;
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

const filterTypeSpan = css`
  margin-right: 10px;
  color: #c9c9c9;
  font-size: 16px;

  ${mobile} {
    font-size: 14px;
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
