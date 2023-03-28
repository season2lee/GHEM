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

  return (
    <div css={ComputerSpecWrapper}>
      <h5>CPU</h5>
      <div css={selectBoxWrapper}>
        <SelectBox optionList={brand} setOption={setSelectedBrand} />
        <input type="text" placeholder="모델명" onChange={handleChangeSeries} />
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

export default ComputerSpecCPU;
