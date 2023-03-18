/* 구현할 것들
  1. 작성자 프사, 닉네임 달기
*/

import { css } from '@emotion/react'
import React from 'react'

function Header() {
  return (
    <div css={container}>
      This is Header
    </div>
  )
}

const container = css`
  min-height: 60px;
  border-radius: 10px 10px 0px 0px;
  background-color: rgb(70, 59, 88);
`

export default Header