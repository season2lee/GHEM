import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";
import { getCpuModel } from "@/api/computerSpec";

function ComputerSpecCPU() {
  const [brand, setBrand] = useState<string[]>(["Intel", "AMD"]);
  const [series, setSeries] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>(brand[0]);
  const [selectedSeries, setSelectedSeries] = useState<string>("");

  const handleChangeSeries = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const response = await getCpuModel(selectedBrand, e.target.value);

    if (response) {
      setSeries(response.cpu_brand_list);
      console.log(response.cpu_brand_list);
    }
  };

  const handleSelectSeries = () => {
    // 시리즈 선택 후
    // 선택 창 닫고, input에 value 남기기
  };

  return (
    <div css={ComputerSpecWrapper}>
      <h5>CPU</h5>
      <div css={selectBoxWrapper}>
        <SelectBox optionList={brand} setOption={setSelectedBrand} />
        <div css={inputWrapper}>
          <input type="text" placeholder="모델명" onChange={handleChangeSeries} />
          <div css={resultWrapper}>
            {series.length &&
              series.map((el, idx) => (
                <span key={idx} onClick={handleSelectSeries}>
                  {el}
                </span>
              ))}
          </div>
        </div>
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

const inputWrapper = css`
  position: relative;

  > input {
    width: 170px;
    height: 40px;
    outline: none;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    padding: 0 10px;
    border-bottom: 1px solid white;
  }
`;

const resultWrapper = css`
  position: absolute;
  top: 45px;
  width: 100%;
  max-height: 70px;
  padding: 10px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  > span {
    cursor: pointer;
    color: black;
    font-size: 14px;
    margin-bottom: 8px;

    :hover {
      color: #756292;
      font-weight: bold;
    }
  }
`;

export default ComputerSpecCPU;
