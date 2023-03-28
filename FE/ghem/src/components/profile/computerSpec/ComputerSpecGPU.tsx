import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";
import { getGpuBrand, getGpuModel } from "@/api/computerSpec";
import { specInfoState } from "@/store/mainState";
import { useRecoilState } from "recoil";

function ComputerSpecGPU() {
  const [specInfo, setSpecInfo] = useRecoilState(specInfoState);
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
    // 시리즈 검색 시 특수기호 제거
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/g;
    e.target.value = e.target.value.replace(regExp, "");

    setSelectedModelName(e.target.value);

    if (e.target.value !== "") {
      const response = await getGpuModel(selectedBrand, e.target.value);

      if (response) {
        setModelName(response.gpu_brand_list);
        setIsOpenOption(true);
      }
    }
  };

  const handleSelectModelName = (selected: string) => {
    setSelectedModelName(selected);
    // 변경되는 GPU 모델명 recoil에 저장
    setSpecInfo((prev) => {
      return {
        ...prev,
        gpu_name: selected,
      };
    });
    setIsOpenOption(false);
  };

  useEffect(() => {
    // 기존에 설정된 스펙이 있다면 세팅하기
    if (specInfo.gpu_com !== "" && specInfo.gpu_name !== "") {
      setSelectedBrand(specInfo.gpu_com);
      setSelectedModelName(specInfo.gpu_name);
    }
    getGpuBrandFunc();
  }, []);

  useEffect(() => {
    if (brand.length) {
      setSelectedBrand(brand[0]);
    }
  }, [brand]);

  useEffect(() => {
    setSelectedModelName("");
    // 변경되는 GPU 브랜드 recoil에 저장
    setSpecInfo((prev) => {
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
        <SelectBox optionList={brand} setOption={setSelectedBrand} />
        <div css={inputWrapper}>
          <input type="text" placeholder="모델명" onChange={handleChangeModelName} value={selectedModelName} />
          {isOpenOption && (
            <div css={resultWrapper}>
              {modelName.length &&
                modelName.map((el, idx) => (
                  <span key={idx} onClick={() => handleSelectModelName(el)}>
                    {el}
                  </span>
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
  padding: 10px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  z-index: 1;
  border: 2px solid #756292;

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

export default ComputerSpecGPU;
