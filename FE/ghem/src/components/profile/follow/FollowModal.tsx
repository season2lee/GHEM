import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { AiOutlineClose } from "react-icons/ai";
import FollowList from "./FollowList";
import { getUserFollowerList, getUserFollowingList } from "@/api/following";
import { followListType } from "apiTypes";
import { useLocation } from "react-router-dom";

type FollowModalProps = {
  handleOpenFollowModal: () => void;
  type: string;
};

function FollowModal({ handleOpenFollowModal, type }: FollowModalProps) {
  const location = useLocation();
  const userId: number | null = Number(localStorage.getItem("id"));
  const [followType, setFollowType] = useState<string>("");
  const [followList, setFollowList] = useState<followListType[]>([]);
  const [isMyProfile, setIsMyProfile] = useState<boolean>(true);

  const handleCloseModal = (): void => {
    handleOpenFollowModal();
  };

  const handleChangeFollowType = (type: string): void => {
    setFollowType(type);
  };

  const getFollowListFunc = async (id: number): Promise<void> => {
    // setFollowList([]);

    if (followType === "팔로잉") {
      const response = await getUserFollowingList(id);

      if (response) {
        setFollowList(response);
      }
    } else if (followType === "팔로워") {
      const response = await getUserFollowerList(id);

      if (response) {
        setFollowList(response);
      }
    }
  };

  useEffect(() => {
    setFollowType(type);
  }, []);

  useEffect(() => {
    // type이 정해지거나 바뀔 때마다 새로운 list 불러오기
    if (location.pathname !== "/profile/computerspec") {
      // 게임 목록 페이지라면 pathid에 따라 팔로우 목록 불러오기
      const pathnameId = Number(location.pathname.split("/")[2]);

      if (pathnameId === userId) {
        setIsMyProfile(true);
      } else {
        setIsMyProfile(false);
      }

      getFollowListFunc(pathnameId);
    } else {
      // 아니라면 무조건 내 팔로우 목록 불러오기
      getFollowListFunc(userId);
    }
  }, [followType, location]);

  return (
    <div css={wrapper}>
      <div css={followModalWrapper}>
        <div css={headerWrapper}>
          <h4>관심친구 목록</h4>
          <AiOutlineClose onClick={handleCloseModal} size="20" />
        </div>
        <div css={followMenuWrapper}>
          <span
            onClick={() => handleChangeFollowType("팔로잉")}
            css={[followSpan, followType === "팔로잉" ? isActive : ""]}
          >
            팔로잉
          </span>
          <span
            onClick={() => handleChangeFollowType("팔로워")}
            css={[followSpan, followType === "팔로워" ? isActive : ""]}
          >
            팔로워
          </span>
        </div>
        <FollowList type={followType} followList={followList} isMyProfile={isMyProfile} />
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

  > h4,
  > svg {
    color: #7d7d7d;
  }

  > svg {
    cursor: pointer;
  }
`;

const followMenuWrapper = css`
  margin: 25px 0 15px 0;
  border-bottom: 1px solid #c1c1c1;
  padding: 0 0 8px 0;
`;

const followSpan = css`
  color: #7d7d7d;
  cursor: pointer;
  margin-right: 10px;

  :hover {
    font-weight: bold;
  }
`;

const isActive = css`
  font-weight: bold;
  color: #756292;
`;

export default FollowModal;
