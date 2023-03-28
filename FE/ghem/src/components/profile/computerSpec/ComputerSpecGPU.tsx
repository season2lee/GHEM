import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";
import { getGpuBrand, getGpuModel } from "@/api/computerSpec";

function ComputerSpecGPU() {
  const [brand, setBrand] = useState<string[]>([]);
  const [modelName, setModelName] = useState<string[]>(["모델명"]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedSeries, setSelectedSeries] = useState<string>("");

  const getGpuBrandFunc = async (): Promise<void> => {
    const response = await getGpuBrand();

    if (response) {
      setBrand(response.gpu_brand_list);
    }
  };

  const handleChangeSeries = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const response = await getGpuModel(selectedBrand, e.target.value);

    if (response) {
      setModelName(response.gpu_brand_list);
      console.log(response.gpu_brand_list);
    }
  };

  useEffect(() => {
    getGpuBrandFunc();
  }, []);

  useEffect(() => {
    if (brand.length) {
      setSelectedBrand(brand[0]);
    }
  }, [brand]);

  return (
    <div css={ComputerSpecWrapper}>
      <h5>GPU</h5>
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

export default ComputerSpecGPU;
