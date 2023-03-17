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
  /* -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none; */

  cursor: pointer;
  width: 200px;
  height: 40px;
  outline: none;
  background: none;
  color: white;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid white;

  > option {
    background: #352c42;
  }
`;

export default SelectBox;
