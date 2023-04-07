import { useState } from "react";
import { css } from "@emotion/react";
import { AiOutlineClose } from "react-icons/ai";
import { putUserSteamAccount } from "@/api/user";
import { RiInformationLine } from "react-icons/ri";
import { steamAccountType } from "apiTypes";

type ProfileSteamIdModalProps = {
  handleOpenSteamIdModal: () => void;
};

function ProfileSteamIdModal({ handleOpenSteamIdModal }: ProfileSteamIdModalProps) {
  const userId: number | null = Number(localStorage.getItem("id"));
  const [steamId, setSteamId] = useState<string>("");
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const regExp1 = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g; // 특수문자 정규식
  const regExp2 = /[^0-9]/g; // 숫자만 가능

  const handleCloseModal = (): void => {
    handleOpenSteamIdModal();
  };

  const handleChangeSteamId = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(regExp1, "");
    e.target.value = e.target.value.replace(regExp2, "");
    setSteamId(e.target.value);
  };

  const handleRegistSteamAccount = async (): Promise<void> => {
    if (userId) {
      if (steamId === "") {
        return;
      }

      const steamAccount: steamAccountType = {
        steamId: steamId,
        userId: userId,
      };

      const response = await putUserSteamAccount(steamAccount);

      console.log(response);

      if (response) {
        location.reload();
      }
    }
  };

  const handleOpenTooltip = (): void => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  return (
    <div css={wrapper}>
      <div css={modalWrapper}>
        <div css={headerWrapper}>
          <h5>Steam ID 등록</h5>
          <AiOutlineClose onClick={handleCloseModal} size="23" />
        </div>
        <div css={tooltipWrapper}>
          <div css={tooltip} onClick={handleOpenTooltip}>
            도움말
            <RiInformationLine size="20" />
          </div>
          {isTooltipOpen && (
            <div css={tooltipBox}>
              <span>Steam 프로필을 다른 사용자들과 공유하려면, 17자리 고유 ID를 등록하세요 !</span>
              <span>고유ID는 프로필 주소창에서 확인할 수 있어요.</span>
              <a href="https://store.steampowered.com/" target="_blank">
                고유 ID 확인하러가기
              </a>
            </div>
          )}
        </div>
        <input type="text" placeholder="숫자만 입력 가능" value={steamId} onChange={handleChangeSteamId} />
        <div css={buttonWrapper}>
          <button onClick={handleRegistSteamAccount}>등록</button>
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

const modalWrapper = css`
  width: 360px;
  background: #352c42;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 35px;
  display: flex;
  flex-direction: column;

  > input {
    border: none;
    outline: none;
    background: none;
    font-size: 16px;
    color: #ffffff;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 15px;
    box-shadow: inset 5px 5px 10px 1px #271f31;

    ::placeholder {
      color: #b4b4b4;
      opacity: 1;
    }
  }

  > button {
    text-align: center;
    width: 200px;
  }
`;

const headerWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  > svg {
    cursor: pointer;
  }
`;

const tooltipWrapper = css`
  position: relative;
`;

const tooltip = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  margin-bottom: 20px;
  color: #aeaeae;
  font-size: 15px;
  cursor: pointer;

  > svg {
    margin-left: 5px;
    cursor: pointer;
  }

  :hover {
    transition: all 0.5s;
    color: #d3d2d2;
  }
`;

const tooltipBox = css`
  position: absolute;
  width: 100%;
  height: 140px;
  background: white;
  top: 25px;
  right: 0;
  border-radius: 5px;
  z-index: 1;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  opacity: 0.9;

  > span {
    font-size: 15px;
    color: black;
  }

  > a {
    padding: 5px 15px;
    color: white;
    background: #352c42;
    border: none;
    border-radius: 5px;
    font-size: 15px;

    :hover {
      transition: all 0.2s;
      background: #5e4e74;
    }
  }
`;

const buttonWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  > button {
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 70px;
    font-size: 16px;
    background: #756292;
    color: white;

    :hover {
      transition: all 1s;
      background: #a692c4;
    }
  }
`;

export default ProfileSteamIdModal;
