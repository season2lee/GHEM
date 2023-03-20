import { useState } from "react";
import { css } from "@emotion/react";
import testGameImage from "../../../assets/image/testGameImage.jpg";
import meatballIcon from "../../../assets/image/meatballIcon.png";
import { FaHeart } from "react-icons/fa";
import MenuDropdown from "../common/MenuDropdown";
import { useNavigate } from "react-router-dom";

type GameCardProps = {
  path?: string;
};

function GameCard({ path }: GameCardProps) {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const handleOpenMenu = (): void => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleRemoveLike = (): void => {
    alert("관심 목록에서 해제하시겠습니까?");
  };

  const moveToGameDetail = (id: number): void => {
    navigate(`/detail/${id}`);
  };

  return (
    <div css={gameCardWrapper}>
      <div css={gameImageWrapper}>
        <img src={testGameImage} alt="게임 이미지" />
        {path === "interest" ? (
          <div css={likeButtonWrapper}>
            <FaHeart size="25" onClick={handleRemoveLike} />
          </div>
        ) : (
          <div css={gameMeatballWrapper} onClick={handleOpenMenu}>
            <img src={meatballIcon} alt="미트볼 메뉴 아이콘" />
            {isOpenMenu && <MenuDropdown />}
          </div>
        )}
      </div>
      <div css={gameContentWrapper} onClick={() => moveToGameDetail(1)}>
        <div css={gameContentHeader}>
          <b>카트 라이더</b>
          {path !== "interest" && <span>평점</span>}
        </div>
        {path !== "interest" && <span>이 게임 정말 재밌어요 킹왕짱 !</span>}
      </div>
    </div>
  );
}

const gameCardWrapper = css`
  min-width: 310px;
  background: #292233;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`;

const gameImageWrapper = css`
  position: relative;

  > img {
    width: 100%;
    border-radius: 5px 5px 0 0;
  }
`;

const gameMeatballWrapper = css`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  height: 23px;
  background: rgba(202, 202, 202, 0.8);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;

  :hover {
    transition: all 0.2s;
    background: #a8a8a8;
  }
`;

const likeButtonWrapper = css`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  height: 23px;
  cursor: pointer;
  display: flex;
  justify-content: center;

  > svg {
    color: #ec3131;

    :hover {
      transition: all 0.2s;
      color: #ff8282;
    }
  }
`;

const gameContentWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 10px 15px 15px 15px;
  cursor: pointer;

  > span {
    font-size: 15px;
  }
`;

const gameContentHeader = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;

  > span {
    font-size: 13px;
  }
`;

export default GameCard;
