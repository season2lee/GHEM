import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";
import { specInfoState } from "@/store/mainState";
import { useRecoilState } from "recoil";

function ComputerSpecOS() {
  const [specInfo, setSpecInfo] = useRecoilState(specInfoState);
  const type: string[] = ["Windows", "Mac OS", "Linux"];
  const [selectedType, setSelectedType] = useState<string>(type[0]);

  useEffect(() => {
    // 기존에 설정된 스펙이 있다면 세팅하기
    if (specInfo.os !== "") {
      setSelectedType(specInfo.os);
    }
  }, []);

  useEffect(() => {
    // 변경되는 OS recoil에 저장
    setSpecInfo((prev) => {
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
