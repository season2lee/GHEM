import React from "react";
import { css } from "@emotion/react";
import { mobile } from "@/util/Mixin";

type SelectBoxProps = {
  optionList: string[];
  setOption: React.Dispatch<React.SetStateAction<string>>;
};

function SelectBox({ optionList, setOption }: SelectBoxProps) {
  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setOption(e.target.value);
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

  ${mobile} {
    width: 100px;
  }
`;

export default SelectBox;
