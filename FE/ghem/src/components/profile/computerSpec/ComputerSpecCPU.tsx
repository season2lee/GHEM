import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";
import { getCpuModel } from "@/api/computerSpec";
import { specInfoState, modifiedSpecInfoState } from "@/store/mainState";
import { useSetRecoilState, useRecoilValue } from "recoil";

function ComputerSpecCPU() {
  const specInfo = useRecoilValue(specInfoState);
  const setModifiedSpecInfo = useSetRecoilState(modifiedSpecInfoState);
  const brand: string[] = ["Intel", "AMD"];
  const [series, setSeries] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>(brand[0]);
  const [selectedSeries, setSelectedSeries] = useState<string>("");
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);

  const handleChangeSeries = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/g;
    e.target.value = e.target.value.replace(regExp, ""); // 시리즈 검색 시 특수기호 제거

    setSelectedSeries(e.target.value);

    if (e.target.value !== "") {
      const response = await getCpuModel(selectedBrand, e.target.value);

      if (response) {
        if (response.cpu_brand_list.length > 0) {
          setSeries(response.cpu_brand_list);
          setIsOpenOption(true);
        }
      }
    }
  };

  const handleSelectSeries = (selected: string) => {
    setModifiedSpecInfo((prev) => {
      return {
        ...prev,
        cpu_series: selected,
      };
    });
    setSelectedSeries(selected);
    setIsOpenOption(false);
  };

  useEffect(() => {
    setModifiedSpecInfo((prev) => {
      return {
        ...prev,
        cpu_com: selectedBrand,
      };
    });
  }, [selectedBrand]);

  useEffect(() => {
    // 기존에 설정된 스펙 값 세팅
    if (specInfo.cpu_com !== "" && specInfo.cpu_series !== "") {
      setSelectedBrand(specInfo.cpu_com);
      setSelectedSeries(specInfo.cpu_series);
    }
  }, [specInfo]);

  return (
    <div css={ComputerSpecWrapper}>
      <h5>CPU</h5>
      <div css={selectBoxWrapper}>
        <SelectBox optionList={brand} setOption={setSelectedBrand} selectedOption={selectedBrand} />
        <div css={inputWrapper}>
          <input type="text" placeholder="시리즈" onChange={handleChangeSeries} value={selectedSeries} />
          {isOpenOption && (
            <div css={resultWrapper}>
              {series.length > 0 &&
                series.map((el, idx) => (
                  <div key={idx} onClick={() => handleSelectSeries(el)}>
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
  z-index: 2;
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

export default ComputerSpecCPU;
