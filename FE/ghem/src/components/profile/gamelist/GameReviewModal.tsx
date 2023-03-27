import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { contentInfoState } from "@/store/mainState";
import { useRecoilValue } from "recoil";
import GameRating from "./GameRating";
import { postGameContent, putUpdateGameContent } from "@/api/gamelist";
import FormatDate from "@/util/FormatDate";

type GameReviewModalProps = {
  handleOpenModifyModal: (e: React.MouseEvent) => void;
};

function GameReviewModal({ handleOpenModifyModal }: GameReviewModalProps) {
  const userId: number | null = Number(localStorage.getItem("id"));
  const contentInfo = useRecoilValue(contentInfoState);
  const [content, setContent] = useState<string>("");
  const [isFirstReview, setIsFirstReview] = useState<boolean>(false);

  const handleCloseModal = (e: React.MouseEvent): void => {
    handleOpenModifyModal(e);
  };

  const handleUpdateGameReview = async (): Promise<void> => {
    // 리뷰 등록이 안돼있으면 POST요청
    if (isFirstReview) {
      const date = FormatDate();
      const changedContentInfo = {
        app_id: contentInfo.app_id,
        user_id: userId,
        content: content,
        date: date,
        user_game_id: contentInfo.user_game_id,
      };

      const response = await postGameContent(changedContentInfo);

      if (response) {
        location.reload();
      }
    }
    // 리뷰 등록이 이미 돼있으면 PUT 요청
    else {
      const changedContentInfo = {
        app_id: contentInfo.app_id,
        user_id: userId,
        content: content,
      };

      const response = await putUpdateGameContent(changedContentInfo);

      if (response) {
        location.reload();
      }
    }
  };

  useEffect(() => {
    if (!contentInfo.review) {
      setIsFirstReview(true);
    } else {
      setIsFirstReview(false);
    }
  }, [contentInfo.review]);

  return (
    <div css={wrapper} onClick={(e) => e.stopPropagation()}>
      <div css={gameReviewModalWrapper}>
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${contentInfo.app_id}/header.jpg`}
          alt="게임 이미지"
        />
        <div css={gameContentWrapper}>
          <div css={headerWrapper}>
            <span>{contentInfo.title}</span>
            <GameRating rate={contentInfo.rating} />
          </div>
          <span>나의 리뷰</span>
          <textarea defaultValue={contentInfo.review} onChange={(e) => setContent(e.target.value)}></textarea>
          <div css={buttonWrapper}>
            <button onClick={handleUpdateGameReview}>수정</button>
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
    min-height: 170px;
    max-height: 170px;
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
    background: #eae7ef;
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

  > svg {
    color: #fff629;
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
