import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";
import { getGpuBrand, getGpuModel } from "@/api/computerSpec";
import { specInfoState, modifiedSpecInfoState } from "@/store/mainState";
import { useRecoilValue, useSetRecoilState } from "recoil";

function ComputerSpecGPU() {
  const specInfo = useRecoilValue(specInfoState);
  const setModifiedSpecInfo = useSetRecoilState(modifiedSpecInfoState);
  const [brand, setBrand] = useState<string[]>([]);
  const [modelName, setModelName] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModelName, setSelectedModelName] = useState<string>("");
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);

  const getGpuBrandFunc = async (): Promise<void> => {
    const response = await getGpuBrand();

    if (response) {
      setBrand(response.gpu_brand_list);
    }
  };

  const handleChangeModelName = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/g;
    e.target.value = e.target.value.replace(regExp, ""); // 시리즈 검색 시 특수기호 제거

    setSelectedModelName(e.target.value);

    if (e.target.value !== "") {
      const response = await getGpuModel(selectedBrand, e.target.value);

      if (response) {
        if (response.gpu_brand_list.length > 0) {
          setModelName(response.gpu_brand_list);
          setIsOpenOption(true);
        }
      }
    }
  };

  const handleSelectModelName = (selected: string) => {
    setModifiedSpecInfo((prev) => {
      return {
        ...prev,
        gpu_name: selected,
      };
    });
    setSelectedModelName(selected);
    setIsOpenOption(false);
  };

  useEffect(() => {
    getGpuBrandFunc();
  }, []);

  useEffect(() => {
    // 기존에 설정된 스펙 값 세팅
    if (specInfo.gpu_com !== "" && specInfo.gpu_name !== "") {
      setSelectedBrand(specInfo.gpu_com);
      setSelectedModelName(specInfo.gpu_name);
    }
  }, [specInfo]);

  useEffect(() => {
    if (brand.length && selectedModelName === "") {
      setSelectedBrand(brand[0]);
    }
  }, [brand]);

  useEffect(() => {
    setModifiedSpecInfo((prev) => {
      return {
        ...prev,
        gpu_com: selectedBrand,
      };
    });
  }, [selectedBrand]);

  return (
    <div css={ComputerSpecWrapper}>
      <h5>GPU</h5>
      <div css={selectBoxWrapper}>
        <SelectBox optionList={brand} setOption={setSelectedBrand} selectedOption={selectedBrand} />
        <div css={inputWrapper}>
          <input type="text" placeholder="모델명" onChange={handleChangeModelName} value={selectedModelName} />
          {isOpenOption && (
            <div css={resultWrapper}>
              {modelName.length &&
                modelName.map((el, idx) => (
                  <div key={idx} onClick={() => handleSelectModelName(el)}>
                    {el}
                  </div>
                ))}
            </div>
          )}
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
    width: 200px;
    height: 40px;
    outline: none;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    padding: 0 10px;
    border-bottom: 1px solid white;

    ${mobile} {
      width: 130px;
    }
  }
`;

const resultWrapper = css`
  position: absolute;
  top: 45px;
  width: 100%;
  max-height: 200px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  z-index: 1;
  border: 1px solid white;

  ::-webkit-scrollbar {
    display: none;
  }

  > div {
    cursor: pointer;
    color: black;
    font-size: 14px;
    background: white;
    padding: 10px;

    :hover {
      background: #756292;
      color: white;
    }
  }
`;

export default ComputerSpecGPU;
