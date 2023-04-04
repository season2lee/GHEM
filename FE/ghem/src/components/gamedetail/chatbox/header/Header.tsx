/* 구현할 것들
  1. 작성자 프사, 닉네임 달기
*/

import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import defaultProfile from '@/assets/image/defaultProfile.jpg';
import { getUserID, getUserProfile } from '@/api/user';

function Header() {
  const [userID, setUserID] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserID(() => {
      const id = getUserID();
      if (id !== null) {
        const response = getUserProfile(id);
        response
          .then(result => {
            const user = result?.user;
            setProfileImage(user?.userProfile.substr(1, user.userProfile.length - 2) ?? defaultProfile);
          });
      }
      
      return id;
    });

    // setUserName(() => {
      
    // })
  }, [userID])


  return (
    <div css={container}>
      <img css={profileImageStyle} src={profileImage} alt="" />
      <p css={nameStyle}>{userName}</p>
    </div>
  )
}

const container = css`
  display: flex;
  align-items: center;
  min-height: 80px;
  border-radius: 10px 10px 0px 0px;
  background-color: rgb(70, 59, 88);
  padding: 1.5rem;
`

const profileImageStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const nameStyle = css`
  margin-left: 10px;
  font-size: 0.9rem;
  font-weight: bold;
`

export default Header