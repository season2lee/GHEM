import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { getNicknameCheck } from "@/api/user";

type ProfileNicknameProps = {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  isPossibleNickname: number | null;
  setIsPossibleNickname: React.Dispatch<React.SetStateAction<number | null>>;
};

function ProfileNickname({ nickname, setNickname, isPossibleNickname, setIsPossibleNickname }: ProfileNicknameProps) {
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
        setIsPossibleNickname(0); // 기존 닉네임과 같은 경우 무시
        return;
      }

      const response = await getNicknameCheck(e.target.value);

      if (response) {
        if (response.isPossible) {
          setIsPossibleNickname(1); // 사용 가능 닉네임
        } else {
          setIsPossibleNickname(2); // 사용 불가능 닉네임
        }
      }
    } else if (e.target.value === "") {
      setIsPossibleNickname(3); // 검사할 닉네임이 없으면 무시
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
        {isPossibleNickname === 1 ? (
          <span css={nicknameCheckSpan}>사용 가능한 닉네임이에요.</span>
        ) : isPossibleNickname === 2 ? (
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
