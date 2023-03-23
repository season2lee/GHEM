import { css } from "@emotion/react";
import React, { useRef, useState } from "react";
import FriendListItem from "./FriendListItem";

function FriendList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [canClick, setCanClick] = useState<boolean>(true);
  const [isMouseOn, setIsMouseOn] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [currentScroll, setCurrentScroll] = useState<number>(0);

  const scrollElement = scrollRef.current as HTMLDivElement;

  const onDragStart = (e: React.MouseEvent<HTMLElement>) => {
    setIsDrag(true);
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
      css={flexDiv}
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragLeave}
      onMouseOver={() => setIsMouseOn(true)}
    >
      <FriendListItem id="1" />
      <FriendListItem id="2" />
      <FriendListItem id="3" />
      <FriendListItem id="4" />
      <FriendListItem id="5" />
      <FriendListItem id="6" />
    </div>
  );
}

const flexDiv = css`
  display: flex;
  /* justify-content: center; */
  overflow: scroll;
  margin: 3rem;
  /* 가로 스크롤 + 숨기기 */
  /* overflow: hidden;
  white-space: nowrap; */
  /* scroll bar 제거 ( chrome 환경)*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default FriendList;
