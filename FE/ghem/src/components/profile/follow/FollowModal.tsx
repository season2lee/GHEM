import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { AiOutlineClose } from "react-icons/ai";
import FollowList from "./FollowList";
import { getUserFollowerList, getUserFollowingList } from "@/api/following";

type FollowModalProps = {
  handleOpenFollowModal: () => void;
  type: string;
};

function FollowModal({ handleOpenFollowModal, type }: FollowModalProps) {
  const userId: number | null = Number(localStorage.getItem("id"));
  const [followType, setFollowType] = useState<string>("");
  const [followList, setFollowList] = useState<string[]>([]);

  const handleCloseModal = (): void => {
    handleOpenFollowModal();
  };

  const handleChangeFollowType = (type: string): void => {
    setFollowType(type);
  };

  const getFollowListFunc = async (): Promise<void> => {
    if (followType === "팔로잉") {
      const response = await getUserFollowingList(userId);

      if (response) {
        setFollowList(response); // 임시
      }
    } else if (followType === "팔로워") {
      const response = await getUserFollowerList(userId);

      if (response) {
        setFollowList(response); // 임시
      }
    }
  };

  useEffect(() => {
    setFollowType(type);
  }, []);

  useEffect(() => {
    // type이 정해지거나 바뀔 때마다 새로운 list 불러오기
    getFollowListFunc();
  }, [followType]);

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
        <FollowList type="팔로잉" followList={followList} />
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
