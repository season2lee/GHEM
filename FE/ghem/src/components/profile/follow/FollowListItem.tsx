import { css } from "@emotion/react";
import { followListType } from "apiTypes";
import { deleteUserUnfollow } from "@/api/following";

type FollowListItemProps = {
  followUser: followListType;
  followType: string;
  isMyProfile: boolean;
};

function FollowListItem({ followUser, followType, isMyProfile }: FollowListItemProps) {
  const userId: number | null = Number(localStorage.getItem("id"));

  const moveToOtherProfile = (): void => {
    location.href = `/profile/${followUser.user_id}/gamelist`;
  };

  const handleUnfollowUser = async (type: string): Promise<void> => {
    if (type === "언팔로우") {
      const response = await deleteUserUnfollow(userId, followUser.user_id);

      if (response) {
        location.reload();
      }
    } else if (type === "삭제") {
      const response = await deleteUserUnfollow(followUser.user_id, userId);

      if (response) {
        location.reload();
      }
    }
  };

  return (
    <div css={wrapper}>
      <div css={userInfoWrapper} onClick={moveToOtherProfile}>
        <img src={followUser.userProfile.substr(1, followUser.userProfile.length - 2)} alt="유저 프로필 이미지" />
        <span>{followUser.nickname}</span>
      </div>
      {isMyProfile ? (
        followType === "팔로잉" ? (
          <button css={unfollowButton} onClick={() => handleUnfollowUser("언팔로우")}>
            언팔로우
          </button>
        ) : (
          <button css={deleteButton} onClick={() => handleUnfollowUser("삭제")}>
            삭제
          </button>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

const wrapper = css`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  :hover {
    background: #f3f3f3;
  }

  > button {
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 20px;
    color: white;
    padding: 5px 12px;
  }
`;

const unfollowButton = css`
  background: #756292;

  :hover {
    transition: all 0.5s;
    background: #695883;
  }
`;

const deleteButton = css`
  background: #f90808;

  :hover {
    transition: all 0.5s;
    background: #d50707;
  }
`;

const userInfoWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #7d7d7d;
  cursor: pointer;

  > img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  > span {
    font-size: 16px;
    margin-left: 10px;
  }
`;

export default FollowListItem;
