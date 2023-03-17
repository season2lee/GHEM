import React from "react";
import { css } from "@emotion/react";
import { BiReset } from "react-icons/bi";
import ComputerSpecCPU from "./ComputerSpecCPU";
import ComputerSpecGPU from "./ComputerSpecGPU";
import ComputerSpecRAM from "./ComputerSpecRAM";
import ComputerSpecOS from "./ComputerSpecOS";

function ComputerSpec() {
  const handleResetComputerSpec = (): void => {
    alert("정말 초기화하시겠습니까?");
  };

  return (
    <div css={computerSpecWrapper}>
      <div css={computerSpecBox}>
        <div css={computerSpecHeader}>
          <h4>내 컴퓨터 사양</h4>
          <BiReset size="30" onClick={handleResetComputerSpec} />
        </div>
        <ComputerSpecCPU />
        <ComputerSpecGPU />
        <div css={ramOsWrapper}>
          <ComputerSpecOS />
          <ComputerSpecRAM />
        </div>
        <button>등록하기</button>
      </div>
    </div>
  );
}

const computerSpecWrapper = css`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const computerSpecBox = css`
  padding: 40px;
  background: #352c42;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: 40px;
  }

  > button {
    margin-top: 30px;
    width: 30%;
    padding: 15px 0;
    background: #756292;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border: none;
    outline: none;
  }
`;

const computerSpecHeader = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  > svg {
    color: #f90808;
    cursor: pointer;
    margin-left: 10px;
  }
`;

const ramOsWrapper = css`
  display: flex;
  flex-direction: row;
`;

export default ComputerSpec;
