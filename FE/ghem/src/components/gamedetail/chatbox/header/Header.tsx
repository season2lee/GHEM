/* 구현할 것들
  1. 작성자 프사, 닉네임 달기
*/

import { css } from '@emotion/react'
import React from 'react'
import defaultProfile from '@/assets/image/defaultProfile.jpg';

function Header() {
  return (
    <div css={container}>
      <img css={profileImageStyle} src={defaultProfile} alt="" />
      <p css={nameStyle}>로그인한 유저 닉네임</p>
    </div>
  )
}

const container = css`
  display: flex;
  align-items: center;
  padding: 10px;
  min-height: 80px;
  border-radius: 10px 10px 0px 0px;
  background-color: rgb(70, 59, 88);
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