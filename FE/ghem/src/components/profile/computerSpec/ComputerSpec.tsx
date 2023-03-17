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
          <ComputerSpecRAM />
          <ComputerSpecOS />
        </div>
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
  width: 100%;
  padding: 40px;
  background: #352c42;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const computerSpecHeader = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > svg {
    color: #f90808;
    cursor: pointer;
  }
`;

const ramOsWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default ComputerSpec;
