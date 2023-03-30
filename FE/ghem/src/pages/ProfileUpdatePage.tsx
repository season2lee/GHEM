import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ProfileImage from "../components/profile/common/ProfileImage";
import ProfileNickname from "../components/profile/update/ProfileNickname";
import ProfileBirth from "../components/profile/update/ProfileBirth";
import ProfileGender from "../components/profile/update/ProfileGender";
import ProfileIntroduce from "../components/profile/update/ProfileIntroduce";
import { useNavigate } from "react-router-dom";
import { mobile } from "@/util/Mixin";
import { getUserProfile, putUserProfile } from "@/api/user";
import { userInfoType } from "apiTypes";
import baseProfile from "../assets/image/baseProfile.png";

function ProfileUpdatePage() {
  const navigate = useNavigate();
  const userId: number | null = Number(localStorage.getItem("id"));
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<number>(0);
  const [birth, setBirth] = useState<string>("");
  const [introduce, setIntroduce] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>(baseProfile);

  const getUserProfileFunc = async (id: number) => {
    const response = await getUserProfile(id);

    if (response) {
      const { user } = response;

      if (user.nickname) setNickname(user.nickname);
      if (user.gender) setGender(user.gender);
      if (user.birth) setBirth(user.birth);
      if (user.introduce) setIntroduce(user.introduce);
      setProfileImage(user.userProfile.substr(1, user.userProfile.length - 2));
    }
  };

  const handleCancelUpdateProfile = (): void => {
    navigate(`/profile/${userId}/gamelist`);
  };

  const handleUpdateProfile = async (): Promise<void> => {
    if (userId) {
      setIntroduce(introduce.replaceAll("<br>", "\r\n")); // 개행 처리

      const changedUserInfo: userInfoType = {
        user_id: userId,
        nickname: nickname,
        gender: gender,
        birth: birth,
        introduce: introduce,
      };

      const response = await putUserProfile(changedUserInfo);
      if (response) {
        navigate(`/profile/${userId}/gamelist`);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getUserProfileFunc(userId);
    } else {
      navigate("/login"); // 비로그인 유저는 로그인 페이지로 이동
    }
  }, []);

  return (
    <div css={wrapper}>
      <div css={profileUpdateWrapper}>
        <h3>프로필 수정</h3>
        <ProfileImage size={150} src={profileImage} />
        <ProfileNickname nickname={nickname} setNickname={setNickname} />
        <div css={rowFlexWrapper}>
          <ProfileGender gender={gender} setGender={setGender} />
          <ProfileBirth birth={birth} setBirth={setBirth} />
        </div>
        <ProfileIntroduce introduce={introduce} setIntroduce={setIntroduce} />
        <div css={buttonWrapper}>
          <button onClick={handleUpdateProfile}>수정</button>
          <button onClick={handleCancelUpdateProfile}>취소</button>
        </div>
      </div>
    </div>
  );
}

const wrapper = css`
  padding: 50px 136px;

  ${mobile} {
    padding: 30px 15px;
  }
`;

const profileUpdateWrapper = css`
  margin: 0 auto;
  width: 630px;
  background: #352c42;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 100px;

  > h3 {
    margin-bottom: 30px;
  }

  ${mobile} {
    width: 450px;
    padding: 50px 60px;
  }
`;

const rowFlexWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${mobile} {
    align-items: flex-start;
  }
`;

const buttonWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;

  > button {
    cursor: pointer;
    padding: 15px 70px;
    font-size: 16px;
    border: none;
    color: white;
    border-radius: 5px;
  }

  ${mobile} {
    gap: 30px;

    > button {
      padding: 12px 40px;
    }
  }

  > button:nth-of-type(1) {
    background: #756292;

    :hover {
      transition: all 1s;
      background: #a692c4;
    }
  }

  > button:nth-of-type(2) {
    background: #d4cedd;

    :hover {
      transition: all 1s;
      background: #9e9da0;
    }
  }
`;

export default ProfileUpdatePage;
