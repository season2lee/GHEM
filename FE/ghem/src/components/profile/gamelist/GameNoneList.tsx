import React from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

type GameNoneListProps = {
  path: string;
};

function GameNoneList({ path }: GameNoneListProps) {
  const navigate = useNavigate();

  const moveToActionPage = () => {
    switch (path) {
      case "평가":
        navigate("/category");
        break;
      case "찜":
        navigate("/main");
        break;
      default:
    }
  };

  return (
    <div css={wrapper}>
      <span>아직 {path}한 게임이 없습니다.</span>
      <button onClick={moveToActionPage}>{path}하러 가기</button>
    </div>
  );
}

const wrapper = css`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  > button {
    cursor: pointer;
    border: none;
    outline: none;
    background: #756292;
    border-radius: 20px;
    color: white;
    padding: 8px 15px;
    font-size: 16px;

    :hover {
      transition: all 0.5s;
      background: #695883;
    }
  }
`;

export default GameNoneList;
