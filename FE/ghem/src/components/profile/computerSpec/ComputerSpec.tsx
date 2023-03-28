import { useEffect } from "react";
import { css } from "@emotion/react";
import { BiReset } from "react-icons/bi";
import ComputerSpecCPU from "./ComputerSpecCPU";
import ComputerSpecGPU from "./ComputerSpecGPU";
import ComputerSpecRAM from "./ComputerSpecRAM";
import ComputerSpecOS from "./ComputerSpecOS";
import { mobile } from "@/util/Mixin";
import { getMyComputerSpec } from "@/api/computerSpec";

function ComputerSpec() {
  const userId: number | null = Number(localStorage.getItem("id"));

  const handleResetComputerSpec = (): void => {
    alert("정말 초기화하시겠습니까?");
  };

  const getMyComputerSpecFunc = async (): Promise<void> => {
    const response = await getMyComputerSpec(userId);

    if (response) {
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
          <BiReset size="30" onClick={handleResetComputerSpec} />
        </div>
        <ComputerSpecCPU />
        <ComputerSpecGPU />
        <div css={ramOsWrapper}>
          <ComputerSpecOS />
          <ComputerSpecRAM />
        </div>
        <div css={buttonWrapper}>
          <button>등록하기</button>
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
  margin-bottom: 40px;
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;

  > button {
    margin-top: 10px;
    width: 30%;
    padding: 15px 0;
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
