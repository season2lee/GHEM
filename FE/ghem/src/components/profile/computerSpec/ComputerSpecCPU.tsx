import React from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";

function ComputerSpecCPU() {
  return (
    <div css={ComputerSpecWrapper}>
      <h5>CPU</h5>
      <div css={selectBoxWrapper}>
        <SelectBox />
        <SelectBox />
        <SelectBox />
      </div>
    </div>
  );
}

const ComputerSpecWrapper = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  > h5 {
    margin-bottom: 20px;
  }
`;

const selectBoxWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default ComputerSpecCPU;
