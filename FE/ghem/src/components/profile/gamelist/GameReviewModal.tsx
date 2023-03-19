import React from "react";
import { css } from "@emotion/react";
import testGameImage from "../../../assets/image/testGameImage.jpg";

type GameReviewModalProps = {
  handleOpenModifyModal: (e: React.MouseEvent) => void;
};

function GameReviewModal({ handleOpenModifyModal }: GameReviewModalProps) {
  const handleCloseModal = (e: React.MouseEvent): void => {
    handleOpenModifyModal(e);
  };

  return (
    <div css={wrapper} onClick={(e) => e.stopPropagation()}>
      <div css={gameReviewModalWrapper}>
        <img src={testGameImage} />
        <div css={gameContentWrapper}>
          <div css={headerWrapper}>
            <span>카트라이더</span>
            <small>평점</small>
          </div>
          <span>나의 리뷰</span>
          <textarea></textarea>
          <div css={buttonWrapper}>
            <button>수정</button>
            <button onClick={(e) => handleCloseModal(e)}>확인</button>
          </div>
        </div>
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

const gameReviewModalWrapper = css`
  width: 360px;
  background: #292233;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > img {
    width: 100%;
    border-radius: 10px 10px 0 0;
  }
`;

const gameContentWrapper = css`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;

  > span {
    font-size: 16px;
    margin-bottom: 10px;
  }

  > textarea {
    width: 100%;
    height: 200px;
    resize: none;
    outline: none;
    background: EAE7EF;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 30px;
    font-size: 15px;
  }
`;

const headerWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  > span {
    font-size: 20px;
    font-weight: bold;
  }
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 35px;
  justify-content: center;
  margin-bottom: 20px;

  > button {
    cursor: pointer;
    padding: 10px 40px;
    /* width: 100px;
    height: 35px; */
    color: white;
    font-size: 15px;
    border: none;
    border-radius: 5px;
  }

  > button:nth-of-type(1) {
    background: #756292;

    :hover {
      transition: all 0.3s;
      background: #695883;
    }
  }

  > button:nth-of-type(2) {
    background: #d4cedd;

    :hover {
      transition: all 0.3s;
      background: #eae7ef;
    }
  }
`;

export default GameReviewModal;
