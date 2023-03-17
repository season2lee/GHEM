import React from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";

function ComputerSpecOS() {
  return (
    <div css={ComputerSpecWrapper}>
      <h5>OS</h5>
      <div css={selectBoxWrapper}>
        <SelectBox />
      </div>
    </div>
  );
}

const ComputerSpecWrapper = css`
  display: flex;
  flex-direction: column;

  > h5 {
    margin-bottom: 20px;
  }
`;

const selectBoxWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default ComputerSpecOS;
