import React from "react";
import { css } from "@emotion/react";
import { mobile } from "@/Mixin";

function ProfileGender() {
  return (
    <div css={wrapper}>
      <h5>성별</h5>
      <div css={inputWrapper}>
        <div css={genderWrapper}>
          <input type="radio" name="gender" value="male" id="male" defaultChecked />
          <label htmlFor="male">남자</label>
        </div>
        <div css={genderWrapper}>
          <input type="radio" name="gender" value="female" id="female" />
          <label htmlFor="female">여자</label>
        </div>
      </div>
    </div>
  );
}

const wrapper = css`
  margin-top: 50px;
  width: 100%;
`;

const inputWrapper = css`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${mobile} {
    flex-direction: column;
    align-items: normal;
  }
`;

const genderWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 15px;

  ${mobile} {
    margin-right: 0;
    margin-top: 10px;
  }

  > input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    background: white;
    border-radius: 3px;
    width: 18px;
    height: 18px;
    margin-right: 8px;

    ::after {
      content: "";
      border: solid white;
      border-width: 0 2px 2px 0;
      display: none;
      position: relative;
      width: 15%;
      height: 40%;
      top: 20%;
      left: 40%;
      transform: rotate(45deg);
    }

    :checked {
      background: #756292;
    }

    :checked::after {
      display: block;
    }
  }
`;

export default ProfileGender;
