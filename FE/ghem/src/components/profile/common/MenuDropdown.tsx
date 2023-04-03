import { useState } from "react";
import { css } from "@emotion/react";
import { TbPencilMinus } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import GameReviewModal from "../gamelist/GameReviewModal";
import { deleteGameRating } from "@/api/rating";
import { useRecoilValue } from "recoil";
import { contentInfoState } from "@/store/mainState";

function MenuDropdown() {
  const userId: number | null = Number(localStorage.getItem("id"));
  const contentInfo = useRecoilValue(contentInfoState);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  // 리뷰 수정 모달 오픈
  const handleOpenModifyModal = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsOpenModal(!isOpenModal);
  };

  // 평가 항목에서 게임 삭제
  const handleDeleteGame = async (): Promise<void> => {
    if (confirm("평가 항목에서 삭제하시겠습니까?")) {
      const deletedGameInfo = {
        app_id: contentInfo.app_id,
        user_id: userId,
        rating: contentInfo.rating,
      };

      const response = await deleteGameRating(deletedGameInfo);

      if (response) {
        location.reload();
      }
    }
  };

  return (
    <div css={wrapper}>
      <div css={menuWrapper} onClick={handleOpenModifyModal}>
        <TbPencilMinus size="20" />
        <span>리뷰 수정</span>
      </div>
      <div css={menuWrapper} onClick={handleDeleteGame}>
        <AiOutlineDelete size="20" />
        <span>삭제하기</span>
      </div>
      {isOpenModal && <GameReviewModal handleOpenModifyModal={(e) => handleOpenModifyModal(e)} />}
    </div>
  );
}

const wrapper = css`
  position: absolute;
  top: 28px;
  right: 0;
  width: 150px;
  height: 90px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  > div:nth-of-type(1) {
    :hover {
      transition: all 0.3s;
      background: #d4cedd;
      border-radius: 10px 10px 0px 0px;
    }
  }

  > div:nth-of-type(2) {
    :hover {
      transition: all 0.3s;
      background: #d4cedd;
      border-radius: 0px 0px 10px 10px;
    }
  }
`;

const menuWrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > span {
    color: #7d7d7d;
    font-size: 15px;
  }

  > svg {
    color: #7d7d7d;
    margin-right: 5px;
  }
`;

export default MenuDropdown;
