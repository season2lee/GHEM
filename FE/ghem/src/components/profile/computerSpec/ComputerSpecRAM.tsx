import React from "react";
import { css } from "@emotion/react";

function ComputerSpecRAM() {
  return (
    <div css={ComputerSpecWrapper}>
      <h5>RAM</h5>
      <div>
        <input />
      </div>
    </div>
  );
}

const ComputerSpecWrapper = css`
  display: flex;
  flex-direction: column;
`;

export default ComputerSpecRAM;
