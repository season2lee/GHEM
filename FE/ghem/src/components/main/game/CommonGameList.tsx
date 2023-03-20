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
};

function CommonGameList(props: CommonGameListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();

  // current type error 때문에 임의로 만들어주는 코드...
  const scrollElement = scrollRef.current as HTMLDivElement;

  const throttle = (func: Function, ms: number) => {
    let throttled = false;
    return (e: HTMLDivElement) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(e);
          throttled = false;
        }, ms);
      }
    };
  };

  const onDragStart = (e: React.MouseEvent<HTMLElement>) => {
    // e.stopPropagation();
    setIsDrag(true);
    setStartX(e.pageX + scrollElement.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isDrag && startX && scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollElement.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const delay = 10;
  const onThrottleDragMove = throttle(onDragMove, delay);

  return (
    <div
      css={rowScroll}
      id="gameList"
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : null}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      {props.gameList?.map((item) => {
        return (
          <CommonGameListItem
            gameType={props.gameType}
            appid={item.appid}
            imgType={props.imgType}
            key={item.appid}
          />
        );
      })}
    </div>
  );
}

const rowScroll = css`
  display: flex;
  padding: 20px;
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
