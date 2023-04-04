import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { BiReset } from "react-icons/bi";
import ComputerSpecCPU from "./ComputerSpecCPU";
import ComputerSpecGPU from "./ComputerSpecGPU";
import ComputerSpecRAM from "./ComputerSpecRAM";
import ComputerSpecOS from "./ComputerSpecOS";
import { mobile } from "@/util/Mixin";
import { getMyComputerSpec, postMyComputerSpec, putMyComputerSpec } from "@/api/computerSpec";
import { specInfoState, modifiedSpecInfoState } from "@/store/mainState";
import { useRecoilState, useRecoilValue } from "recoil";

function ComputerSpec() {
  const userId: number | null = Number(localStorage.getItem("id"));
  const modifiedSpecInfo = useRecoilValue(modifiedSpecInfoState);
  const [specInfo, setSpecInfo] = useRecoilState(specInfoState);
  const [isFirstSetting, setIsFirstSetting] = useState<boolean>(false);
  const [isValidate, setIsValidate] = useState<boolean>(true);

  const getMyComputerSpecFunc = async (): Promise<void> => {
    const response = await getMyComputerSpec(userId);

    if (response) {
      if (response.MyPcSpecs === null) {
        setIsFirstSetting(true); // 스펙 설정이 처음인지 확인
      } else {
        setSpecInfo({
          // recoil에 현재 컴퓨터 사양 상태 저장
          cpu_com: response.MyPcSpecs.cpu_com,
          cpu_series: response.MyPcSpecs.cpu_series,
          gpu_com: response.MyPcSpecs.gpu_com,
          gpu_name: response.MyPcSpecs.gpu_name,
          os: response.MyPcSpecs.os,
          ram: response.MyPcSpecs.ram,
          user_id: response.MyPcSpecs.user_id,
          spec_id: response.MyPcSpecs.spec_id,
        });
      }
    }
  };

  const handleRegistSpec = async (): Promise<void> => {
    if (isFirstSetting) {
      // 유효성 검사
      if (
        (modifiedSpecInfo.cpu_com === "선택" && specInfo.cpu_com === "") ||
        (modifiedSpecInfo.gpu_com === "선택" && specInfo.gpu_com === "") ||
        (modifiedSpecInfo.os === "선택" && specInfo.os === "") ||
        (modifiedSpecInfo.ram === 0 && specInfo.ram === 0)
      ) {
        setIsValidate(false);
        return;
      }

      const body = {
        cpu_com: modifiedSpecInfo.cpu_com,
        cpu_series: modifiedSpecInfo.cpu_series || specInfo.cpu_series,
        gpu_com: modifiedSpecInfo.gpu_com,
        gpu_name: modifiedSpecInfo.gpu_name || specInfo.gpu_name,
        os: modifiedSpecInfo.os,
        ram: modifiedSpecInfo.ram || specInfo.ram,
        user_id: userId,
      };

      setIsValidate(true);

      const response = await postMyComputerSpec(body);

      if (response) {
        alert("등록되었어요. 😀");
        setIsFirstSetting(false);
        location.reload();
      }
    } else {
      // 변경되지 않으면
      if (
        specInfo.cpu_com === modifiedSpecInfo.cpu_com &&
        specInfo.cpu_series === modifiedSpecInfo.cpu_series &&
        specInfo.gpu_com === modifiedSpecInfo.gpu_com &&
        specInfo.gpu_name === modifiedSpecInfo.gpu_name &&
        specInfo.os === modifiedSpecInfo.os &&
        specInfo.ram === modifiedSpecInfo.ram
      ) {
        return;
      }

      // 유효성 검사
      if (
        modifiedSpecInfo.cpu_com === "선택" ||
        modifiedSpecInfo.gpu_com === "선택" ||
        modifiedSpecInfo.os === "선택" ||
        modifiedSpecInfo.cpu_series === "" ||
        modifiedSpecInfo.gpu_name === "" ||
        modifiedSpecInfo.ram === 0
      ) {
        setIsValidate(false);
        return;
      }

      const body = {
        cpu_com: modifiedSpecInfo.cpu_com,
        cpu_series: modifiedSpecInfo.cpu_series,
        gpu_com: modifiedSpecInfo.gpu_com,
        gpu_name: modifiedSpecInfo.gpu_name,
        os: modifiedSpecInfo.os,
        ram: modifiedSpecInfo.ram,
        spec_id: specInfo.spec_id,
      };

      setIsValidate(true);

      const response = await putMyComputerSpec(body);

      if (response) {
        alert("수정되었어요. 😀");
        location.reload();
      }
    }
  };

  useEffect(() => {
    getMyComputerSpecFunc();
  }, []);

  useEffect(() => {
    console.log("specInfo : ", specInfo);
  }, [specInfo]);

  useEffect(() => {
    console.log("modifiedSpecInfo : ", modifiedSpecInfo);
  }, [modifiedSpecInfo]);

  return (
    <div css={computerSpecWrapper}>
      <div css={computerSpecBox}>
        <div css={computerSpecHeader}>
          <h4>내 컴퓨터 사양</h4>
          {!isValidate && <span>빈칸을 모두 채워주세요.</span>}
          {!isFirstSetting && <BiReset size="28" onClick={getMyComputerSpecFunc} />}
        </div>
        <ComputerSpecCPU />
        <ComputerSpecGPU />
        <div css={ramOsWrapper}>
          <ComputerSpecOS />
          <ComputerSpecRAM />
        </div>
        <div css={buttonWrapper}>
          {isFirstSetting ? (
            <button onClick={handleRegistSpec}>등록하기</button>
          ) : (
            <button onClick={handleRegistSpec}>수정하기</button>
          )}
        </div>
      </div>
    </div>
  );
}

const computerSpecWrapper = css`
  width: auto;
  display: flex;
  flex-direction: column;

  ${mobile} {
    width: 100%;
  }
`;

const computerSpecBox = css`
  padding: 40px;
  background: #352c42;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  ${mobile} {
    width: 100%;
  }
`;

const computerSpecHeader = css`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;

  > svg {
    color: #f90808;
    cursor: pointer;
    margin-left: 10px;
  }

  > span {
    color: #f90808;
    font-size: 13px;
    font-weight: bold;
  }

  ${mobile} {
    > h4 {
      font-size: 20px;
    }
  }
`;

const ramOsWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;

  > button {
    margin-top: 10px;
    padding: 13px 20px;
    background: #756292;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border: none;
    outline: none;

    :hover {
      transition: all 1s;
      background: #a692c4;
    }
  }
`;

export default ComputerSpec;
