import React from "react";
import { css } from "@emotion/react";

type ProfileInputProps = {
  birth: string;
  setBirth: React.Dispatch<React.SetStateAction<string>>;
};

function ProfileBirth({ birth, setBirth }: ProfileInputProps) {
  const handleChangeBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 10) {
      e.target.value = e.target.value.substr(0, 10);
    }
    e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/^(\d{4})(\d{2})(\d{2})$/, `$1-$2-$3`);
    setBirth(e.target.value);
  };

  return (
    <div css={wrapper}>
      <h5>생년월일</h5>
      <input type="text" value={birth} onChange={handleChangeBirth} placeholder="YYYYMMDD" />
    </div>
  );
}

const wrapper = css`
  margin-top: 50px;
  width: 100%;

  > input {
    width: 100%;
    height: 35px;
    background: none;
    border: none;
    border-bottom: 1px solid #ffffff;
    outline: none;
    color: white;
    font-size: 16px;
    padding: 0 5px;
  }
`;

export default ProfileBirth;
