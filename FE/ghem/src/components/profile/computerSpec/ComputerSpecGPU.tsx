import { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import SelectBox from "./common/SelectBox";
import { mobile } from "@/util/Mixin";
import { getGpuModel } from "@/api/computerSpec";
import { specInfoState, modifiedSpecInfoState } from "@/store/mainState";
import { useRecoilValue, useSetRecoilState } from "recoil";

function ComputerSpecGPU() {
  const resultModalRef = useRef<HTMLDivElement>(null);
  const specInfo = useRecoilValue(specInfoState);
  const setModifiedSpecInfo = useSetRecoilState(modifiedSpecInfoState);

  const brand: string[] = [
    "선택",
    "Nvidia",
    "Gigabyte",
    "Asus",
    "MSI",
    "Zotac",
    "AMD",
    "EVGA",
    "Intel",
    "ASRock",
    "XFX",
    "PowerColor",
    "Sapphire",
    "Gainward",
    "PNY",
    "PwrHis",
    "Parallels",
    "Vmware",
    "Microsoft",
    "ATI",
  ];
  const [modelName, setModelName] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>(brand[0]);
  const [selectedModelName, setSelectedModelName] = useState<string>("");
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);

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
    } else {
      setModifiedSpecInfo((prev) => {
        return {
          ...prev,
          gpu_name: "",
        };
      });
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
    setModifiedSpecInfo((prev) => {
      return {
        ...prev,
        gpu_com: selectedBrand,
      };
    });
  }, [selectedBrand]);

  useEffect(() => {
    // 기존에 설정된 스펙 값 세팅
    if (specInfo.gpu_com !== "" && specInfo.gpu_name !== "") {
      setSelectedBrand(specInfo.gpu_com);
      setSelectedModelName(specInfo.gpu_name);
    }
  }, [specInfo]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (resultModalRef.current && !resultModalRef.current.contains(e.target as Node)) {
        setIsOpenOption(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [resultModalRef]);

  return (
    <div css={ComputerSpecWrapper}>
      <h5>GPU</h5>
      <div css={selectBoxWrapper}>
        <SelectBox optionList={brand} setOption={setSelectedBrand} selectedOption={selectedBrand} />
        <div css={inputWrapper}>
          <input type="text" placeholder="모델명" onChange={handleChangeModelName} value={selectedModelName} />
          {isOpenOption && (
            <div css={resultWrapper} ref={resultModalRef}>
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
