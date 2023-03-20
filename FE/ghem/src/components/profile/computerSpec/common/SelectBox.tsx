import React from "react";
import { css } from "@emotion/react";

function SelectBox() {
  return (
    <select css={select}>
      <option>제조사</option>
      <option>사과</option>
      <option>바나나</option>
      <option>레몬</option>
    </select>
  );
}

const select = css`
  cursor: pointer;
  width: 150px;
  height: 40px;
  outline: none;
  background: none;
  color: white;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid white;
  margin-right: 30px;

  > option {
    background: #352c42;
  }
`;

export default SelectBox;
