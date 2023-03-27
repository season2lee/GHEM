import { useState } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";

function ComputerSpecCPU() {
  const [manufacturer, setManufacturer] = useState<string[]>(["제조사"]);
  const [series, setSeries] = useState<string[]>(["시리즈"]);
  const [generation, setGeneration] = useState<string[]>(["세대"]);

  return (
    <div css={ComputerSpecWrapper}>
      <h5>CPU</h5>
      <div css={selectBoxWrapper}>
        <SelectBox optionList={manufacturer} />
        <SelectBox optionList={series} />
        <SelectBox optionList={generation} />
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

    ${mobile} {
      font-size: 18px;
    }
  }
`;

const selectBoxWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default ComputerSpecCPU;
