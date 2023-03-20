import React from "react";
import { css } from "@emotion/react";

function ProfileGender() {
  return (
    <div css={wrapper}>
      <h5>성별</h5>
      <div css={inputWrapper}>
        <input type="radio" name="gender" value="male" defaultChecked />
        남자
        <input type="radio" name="gender" value="female" />
        여자
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

  > input:nth-of-type(2) {
    margin-left: 25px;
  }
`;

export default ProfileGender;
