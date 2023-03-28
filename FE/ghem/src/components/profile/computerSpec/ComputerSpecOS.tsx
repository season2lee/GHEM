import { useState } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";

function ComputerSpecOS() {
  const type: string[] = ["Windows", "Mac OS", "Linux"];
  const [selectedType, setSelectedType] = useState<string>(type[0]);

  return (
    <div css={ComputerSpecWrapper}>
      <h5>OS</h5>
      <div css={selectBoxWrapper}>
        <SelectBox optionList={type} setOption={setSelectedType} />
      </div>
    </div>
  );
}

const ComputerSpecWrapper = css`
  display: flex;
  flex-direction: column;

  > h5 {
    margin-bottom: 20px;

    ${mobile} {
      font-size: 18px;
    }
  }
`;

const selectBoxWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default ComputerSpecOS;
