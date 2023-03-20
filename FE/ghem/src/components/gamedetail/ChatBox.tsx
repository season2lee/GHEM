import { css } from '@emotion/react'
import React from 'react'

function ChatBox() {
  return (
    <div css={container}>ChatBox 컴포넌트</div>
  )
}
const container = css`
  width: 100%;
  height: 40rem;
  position: sticky;
  top: 30px;
  border-radius: 30px;
  background-color: rgb(53, 44, 66);
  padding: 2rem;
`

export default ChatBox