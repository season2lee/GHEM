import React from "react";
import { css } from "@emotion/react";
import { AiOutlineClose } from "react-icons/ai";
import FollowList from "./FollowList";

function FollowModal() {
  const handleCloseModal = (): void => {
    alert("모달 닫기");
  };

  return (
    <div css={wrapper}>
      <div css={followModalWrapper}>
        <div css={headerWrapper}>
          <span>
            <b>닉네임</b> 님의 친구 목록
          </span>
          <AiOutlineClose onClick={handleCloseModal} />
        </div>
        <div css={followMenuWrapper}>
          <span>팔로워</span>
          <span>팔로우</span>
        </div>
        <FollowList path="follow" />
      </div>
    </div>
  );
}

const wrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const followModalWrapper = css`
  width: 360px;
  background: #ffffff;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 35px;
`;

const headerWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > span,
  > svg {
    color: #7d7d7d;
    font-size: 20px;
  }

  > svg {
    cursor: pointer;
  }
`;

const followMenuWrapper = css`
  margin: 25px 0 15px 0;
  border-bottom: 1px solid #c1c1c1;
  padding: 0 0 8px 0;

  > span {
    color: #7d7d7d;
    cursor: pointer;
    margin-right: 10px;

    :hover {
      font-weight: bold;
    }
  }
`;

export default FollowModal;
