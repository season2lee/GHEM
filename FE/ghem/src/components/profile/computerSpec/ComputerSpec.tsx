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

  const handleResetComputerSpec = (): void => {
    // 사양 초기화
  };

  // 컴퓨터 스펙 정보 가져오기
  const getMyComputerSpecFunc = async (): Promise<void> => {
    const response = await getMyComputerSpec(userId);

    if (response) {
      // 스펙 설정이 처음인지 확인
      if (response.MyPcSpecs === null) {
        setIsFirstSetting(true);
      } else {
        // recoil에 현재 컴퓨터 사양 상태 저장
        setSpecInfo({
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
      const body = {
        cpu_com: modifiedSpecInfo.cpu_com,
        cpu_series: modifiedSpecInfo.cpu_series || specInfo.cpu_series,
        gpu_com: modifiedSpecInfo.gpu_com,
        gpu_name: modifiedSpecInfo.gpu_name || specInfo.gpu_name,
        os: modifiedSpecInfo.os,
        ram: modifiedSpecInfo.ram || specInfo.ram,
        user_id: userId,
      };
      console.log("등록 body : ", body);

      const response = await postMyComputerSpec(body);

      if (response) {
        alert("등록되었습니다.");
        setIsFirstSetting(false);
      }
    } else {
      const body = {
        cpu_com: modifiedSpecInfo.cpu_com,
        cpu_series: modifiedSpecInfo.cpu_series || specInfo.cpu_series,
        gpu_com: modifiedSpecInfo.gpu_com,
        gpu_name: modifiedSpecInfo.gpu_name || specInfo.gpu_name,
        os: modifiedSpecInfo.os,
        ram: modifiedSpecInfo.ram || specInfo.ram,
        spec_id: specInfo.spec_id,
      };

      const response = await putMyComputerSpec(body);

      if (response) {
        alert("수정되었습니다.");
      }
    }
  };

  useEffect(() => {
    getMyComputerSpecFunc();
  }, []);

  return (
    <div css={computerSpecWrapper}>
      <div css={computerSpecBox}>
        <div css={computerSpecHeader}>
          <h4>내 컴퓨터 사양</h4>
          {/* <BiReset size="28" onClick={handleResetComputerSpec} /> */}
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  > svg {
    color: #f90808;
    cursor: pointer;
    margin-left: 10px;
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
