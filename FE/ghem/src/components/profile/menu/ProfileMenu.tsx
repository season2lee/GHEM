import { css } from "@emotion/react";
import rightArrow from "../../../assets/image/rightArrow.png";
import bottomArrow from "../../../assets/image/bottomArrow.png";
import { useNavigate } from "react-router";
import { mobile } from "@/Mixin";

type ProfileMenuProps = {
  text: "게임 목록" | "계정 정보" | "프로필 수정" | "내 컴퓨터 사양";
  onClickOpenHiddenMenu?: () => void;
};

function ProfileMenu({ text, onClickOpenHiddenMenu }: ProfileMenuProps) {
  const navigate = useNavigate();

  const handleMoveToProfileMenuPage = (): void => {
    switch (text) {
      case "게임 목록":
        navigate("/profile/gamelist");
        break;
      case "계정 정보":
        if (onClickOpenHiddenMenu) {
          onClickOpenHiddenMenu();
        }
        break;
      case "프로필 수정":
        navigate("/update/profile");
        break;
      case "내 컴퓨터 사양":
        navigate("/profile/computerspec");
        break;
      default:
    }
  };

  return (
    <div css={profileMenuWrapper} onClick={handleMoveToProfileMenuPage}>
      <span>{text}</span>
      {text === "계정 정보" ? (
        <img src={bottomArrow} alt="하방향 화살표" />
      ) : (
        <img src={rightArrow} alt="우방향 화살표" />
      )}
    </div>
  );
}

const profileMenuWrapper = css`
  width: 100%;
  height: 50px;
  background: #463b58;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  transition: all 1s;

  :hover {
    background-color: #584a6e;
  }

  > span {
    position: absolute;
    left: 35px;
  }

  > img {
    position: absolute;
    right: 35px;
    width: 20px;
    height: 20px;
  }

  ${mobile} {
    justify-content: center;
  }
`;

export default ProfileMenu;
