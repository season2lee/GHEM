import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";

type GameNoneListProps = {
  path: string;
};

function GameNoneList({ path }: GameNoneListProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameId = Number(location.pathname.split("/")[2]);
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isMyProfile, setIsMyProfile] = useState<boolean>(true);

  const moveToActionPage = () => {
    switch (path) {
      case "평가":
        navigate("/category");
        break;
      case "찜":
        navigate("/main");
        break;
      default:
    }
  };

  useEffect(() => {
    if (pathnameId === userId) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }
  }, [location]);

  return (
    <div css={wrapper}>
      <span>{path}한 게임이 없습니다.</span>
      {isMyProfile && <button onClick={moveToActionPage}>{path}하러 가기</button>}
    </div>
  );
}

const wrapper = css`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  > button {
    cursor: pointer;
    border: none;
    outline: none;
    background: #756292;
    border-radius: 20px;
    color: white;
    padding: 8px 15px;
    font-size: 16px;

    :hover {
      transition: all 0.5s;
      background: #695883;
    }
  }
`;

export default GameNoneList;
