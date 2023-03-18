import React from "react";
import { css } from "@emotion/react";
import { BsChatLeftText, BsChatLeft } from "react-icons/bs";

function FilterDropdown() {
  return (
    <div css={wrapper}>
      <div css={filterWrapper}>
        <BsChatLeftText />
        <span>리뷰있음</span>
      </div>
      <div css={filterWrapper}>
        <BsChatLeft />
        <span>리뷰없음</span>
      </div>
    </div>
  );
}

const wrapper = css`
  position: absolute;
  top: 30px;
  right: 0;
  width: 150px;
  height: 90px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1;

  > div:nth-of-type(1) {
    :hover {
      background: #d4cedd;
      border-radius: 10px 10px 0px 0px;
    }
  }

  > div:nth-of-type(2) {
    :hover {
      background: #d4cedd;
      border-radius: 0px 0px 10px 10px;
    }
  }
`;

const filterWrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > svg {
    color: #7d7d7d;
    margin-right: 7px;
  }

  > span {
    color: #7d7d7d;
    font-size: 15px;
  }
`;

export default FilterDropdown;
