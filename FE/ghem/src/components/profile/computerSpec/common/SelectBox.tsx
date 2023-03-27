import React from "react";
import { css } from "@emotion/react";

type SelectBoxProps = {
  optionList: string[];
};

function SelectBox({ optionList }: SelectBoxProps) {
  const initOptions = ["제조사", "시리즈", "세대", "모델명", "종류"];

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (initOptions.includes(e.target.value)) return;
    console.log(e.target.value);
  };

  return (
    <select css={select} onChange={handleChangeOption}>
      {optionList.map((option, idx) => (
        <option key={idx}>{option}</option>
      ))}
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
