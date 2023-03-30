import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { getNicknameCheck } from "@/api/user";

type ProfileNicknameProps = {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  isPossible: boolean | null;
  setIsPossible: React.Dispatch<React.SetStateAction<boolean | null>>;
};

function ProfileNickname({ nickname, setNickname, isPossible, setIsPossible }: ProfileNicknameProps) {
  const [originNickname, setOriginNickname] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(true);

  const handleChangeNickname = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setIsChanged(false);

    if (e.target.value.length >= 6) {
      e.target.value = e.target.value.substr(0, 6);
    }

    setNickname(e.target.value);

    if (e.target.value !== "") {
      if (e.target.value === originNickname) {
        setIsPossible(null);
        return;
      }

      const response = await getNicknameCheck(e.target.value);

      if (response) {
        if (response.isPossible) {
          setIsPossible(true); // 사용 가능 닉네임
        } else {
          setIsPossible(false); // 사용 불가능 닉네임
        }
      }
    } else if (e.target.value === "") {
      setIsPossible(null);
    }
  };

  useEffect(() => {
    if (isChanged) {
      setOriginNickname(nickname);
    }
  }, [nickname]);

  return (
    <div css={wrapper}>
      <div css={headerWrapper}>
        <h5>닉네임</h5>
        <h5>*</h5>
        <span>(최대 6자)</span>
        {isPossible === true ? (
          <span css={nicknameCheckSpan}>사용 가능한 닉네임이에요.</span>
        ) : isPossible === false ? (
          <span css={nicknameNoCheckSpan}>이미 사용 중인 닉네임이에요.</span>
        ) : (
          <></>
        )}
      </div>
      <div css={inputWrapper}>
        <input type="text" value={nickname} onChange={handleChangeNickname} />
      </div>
    </div>
  );
}

const wrapper = css`
  margin-top: 50px;
  width: 100%;
`;

const headerWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;

  > h5:nth-of-type(2) {
    color: #f90808;
    margin-left: 3px;
  }

  > span:nth-of-type(1) {
    margin-left: 10px;
    font-size: 16px;
  }
`;

const inputWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  border-bottom: 1px solid #ffffff;

  > input {
    width: 100%;
    height: 35px;
    background: none;
    border: none;
    outline: none;
    color: white;
    font-size: 16px;
    padding: 0 5px;
  }
`;

const nicknameCheckSpan = css`
  margin-left: 10px;
  font-size: 14px;
  color: #08f908;
`;

const nicknameNoCheckSpan = css`
  margin-left: 10px;
  font-size: 14px;
  color: #f90808;
`;

export default ProfileNickname;
