import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import CommonGameListItem from "./CommonGameListItem";

type GameList = {
  appid: number;
};

type CommonGameListProps = {
  gameType?: "discount";
  gameList?: GameList[];
  imgType: "header" | "capsule";
  scrollType: "left" | "right";
};

function CommonGameList(props: CommonGameListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [canClick, setCanClick] = useState<boolean>(true); // 드래그 중이 아닐 때만 클릭 가능함을 나타내는 변수
  const [isMouseOn, setIsMouseOn] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [forTime, setForTime] = useState<number>(0);

  // current type error 때문에 임의로 만들어주는 코드
  const scrollElement = scrollRef.current as HTMLDivElement;

  useEffect(() => {
    const timeout = setTimeout(() => setForTime(forTime + 1), 10);

    if (props.scrollType === "left" && scrollElement && !isMouseOn) {
      scrollElement.scrollLeft += 1;
    }

    if (props.scrollType === "right" && scrollElement && !isMouseOn) {
      scrollElement.scrollLeft -= 1;
    }

    return () => clearTimeout(timeout);
  }, [forTime]);

  const onDragStart = (e: React.MouseEvent<HTMLElement>) => {
    setIsDrag(true);
    console.log(props.scrollType, "scroll");
    setStartX(e.pageX);
  };

  const onDragLeave = () => {
    setIsDrag(false);
    setIsMouseOn(false);
    setTimeout(() => setCanClick(true), 50); // 약간의 시간차가 있어야 클릭과 드래그를 구분 가능
  };

  const onDragEnd = () => {
    setIsDrag(false);
    setTimeout(() => setCanClick(true), 50); // 약간의 시간차가 있어야 클릭과 드래그를 구분 가능
  };

  const onDragMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isDrag) {
      setCanClick(false); // 드래그에 있어야 일반 클릭과 드래그를 true false 나누어 처리 가능
      e.preventDefault();
      scrollElement.scrollLeft += startX - e.pageX;
      setStartX(e.pageX);
    }
  };

  return (
    <div
      css={rowScroll}
      id="gameList"
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragLeave}
      onMouseOver={() => setIsMouseOn(true)}
      // onMouseOut={() => setIsMouseOn(false)}
    >
      {props.gameList?.map((item) => {
        return (
          <CommonGameListItem
            gameType={props.gameType}
            appid={item.appid}
            imgType={props.imgType}
            key={item.appid}
            canClick={canClick}
          />
        );
      })}
    </div>
  );
}

const rowScroll = css`
  display: flex;
  overflow: scroll;
  /* 가로 스크롤 */
  overflow: auto;
  white-space: nowrap;
  /* scroll bar 제거 ( chrome 환경)*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default CommonGameList;
