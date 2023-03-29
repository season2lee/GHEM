import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { mobile } from "@/util/Mixin";
import { specInfoState, modifiedSpecInfoState } from "@/store/mainState";
import { useRecoilValue, useSetRecoilState } from "recoil";

function ComputerSpecRAM() {
  const specInfo = useRecoilValue(specInfoState);
  const setModifiedSpecInfo = useSetRecoilState(modifiedSpecInfoState);
  const [selectedRam, setSelectedRam] = useState<number>(0);

  const handleChangeRam = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자 맞는지 유효성 검사 필요
    setSelectedRam(Number(e.target.value));
    setModifiedSpecInfo((prev) => {
      return {
        ...prev,
        ram: Number(e.target.value),
      };
    });
  };

  useEffect(() => {
    if (specInfo.ram !== 0) {
      setSelectedRam(specInfo.ram);
    }
  }, [specInfo]);

  return (
    <div css={ComputerSpecWrapper}>
      <h5>RAM</h5>
      <div css={inputWrapper}>
        <input type="number" value={selectedRam} onChange={handleChangeRam} />
        <span>GB</span>
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

const inputWrapper = css`
  border: none;
  border-bottom: 1px solid white;
  display: flex;
  flex-direction: row;
  align-items: center;

  > input {
    width: 180px;
    height: 40px;
    outline: none;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    padding: 0 10px;

    ${mobile} {
      width: 110px;
    }
  }

  > span {
    font-size: 16px;
  }
`;

export default ComputerSpecRAM;
