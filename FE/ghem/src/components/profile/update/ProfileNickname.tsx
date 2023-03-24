import React from "react";
import { css } from "@emotion/react";
import { AiOutlineCheck } from "react-icons/ai";

type ProfileNicknameProps = {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
};

function ProfileNickname({ nickname, setNickname }: ProfileNicknameProps) {
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length >= 6) {
      e.target.value = e.target.value.substr(0, 6);
    }
    setNickname(e.target.value);
  };

  return (
    <div css={wrapper}>
      <div css={headerWrapper}>
        <h5>닉네임</h5>
        <h5>*</h5>
        <span>(최대 6자)</span>
      </div>
      <div css={inputWrapper}>
        <input type="text" value={nickname} onChange={handleChangeNickname} />
        <AiOutlineCheck />
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

  > span {
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

  > svg {
    color: #f90808;
    /* color: #08f908; */
  }
`;

export default ProfileNickname;
