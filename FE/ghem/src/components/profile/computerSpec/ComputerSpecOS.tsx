import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";
import { specInfoState, modifiedSpecInfoState } from "@/store/mainState";
import { useRecoilValue, useSetRecoilState } from "recoil";

function ComputerSpecOS() {
  const specInfo = useRecoilValue(specInfoState);
  const setModifiedSpecInfo = useSetRecoilState(modifiedSpecInfoState);
  const type: string[] = ["Windows", "Mac OS", "Linux"];
  const [selectedType, setSelectedType] = useState<string>(type[0]);

  useEffect(() => {
    // 기존에 설정된 스펙 값 세팅
    if (specInfo.os !== "") {
      setSelectedType(specInfo.os);
    }
  }, [specInfo]);

  useEffect(() => {
    setModifiedSpecInfo((prev) => {
      return {
        ...prev,
        os: selectedType,
      };
    });
  }, [selectedType]);

  return (
    <div css={ComputerSpecWrapper}>
      <h5>OS</h5>
      <div css={selectBoxWrapper}>
        <SelectBox optionList={type} setOption={setSelectedType} selectedOption={selectedType} />
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
