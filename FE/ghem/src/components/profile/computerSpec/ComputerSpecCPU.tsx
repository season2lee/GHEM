import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";
import { getCpuModel } from "@/api/computerSpec";
import { specInfoState } from "@/store/mainState";
import { useRecoilState } from "recoil";

function ComputerSpecCPU() {
  const [specInfo, setSpecInfo] = useRecoilState(specInfoState);
  const brand: string[] = ["Intel", "AMD"];
  const [series, setSeries] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>(brand[0]);
  const [selectedSeries, setSelectedSeries] = useState<string>("");
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);

  const handleChangeSeries = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    // 시리즈 검색 시 특수기호 제거
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/g;
    e.target.value = e.target.value.replace(regExp, "");

    setSelectedSeries(e.target.value);

    if (e.target.value !== "") {
      const response = await getCpuModel(selectedBrand, e.target.value);

      if (response) {
        setSeries(response.cpu_brand_list);
        setIsOpenOption(true);
      }
    }
  };

  const handleSelectSeries = (selected: string) => {
    setSelectedSeries(selected);
    // 변경되는 CPU 시리즈 recoil에 저장
    setSpecInfo((prev) => {
      return {
        ...prev,
        cpu_series: selected,
      };
    });
    setIsOpenOption(false);
  };

  useEffect(() => {
    setSelectedSeries("");
    // 변경되는 CPU 브랜드 recoil에 저장
    setSpecInfo((prev) => {
      return {
        ...prev,
        cpu_com: selectedBrand,
      };
    });
  }, [selectedBrand]);

  useEffect(() => {
    // 기존에 설정된 스펙이 있다면 세팅하기
    if (specInfo.cpu_com !== "" && specInfo.cpu_series !== "") {
      setSelectedBrand(specInfo.cpu_com);
      setSelectedSeries(specInfo.cpu_series);
    }
  }, []);

  return (
    <div css={ComputerSpecWrapper}>
      <h5>CPU</h5>
      <div css={selectBoxWrapper}>
        <SelectBox optionList={brand} setOption={setSelectedBrand} />
        <div css={inputWrapper}>
          <input type="text" placeholder="시리즈" onChange={handleChangeSeries} value={selectedSeries} />
          {isOpenOption && (
            <div css={resultWrapper}>
              {series.length &&
                series.map((el, idx) => (
                  <span key={idx} onClick={() => handleSelectSeries(el)}>
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
  z-index: 2;
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

export default ComputerSpecCPU;
