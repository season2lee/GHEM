import { css } from '@emotion/react'
import React from 'react'
import Body from './Body'
import Footer from './Footer'
import Header from './Header'

function ChatBox() {
  return (
    <div css={container}>
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

const container = css`
  position: sticky;
  top: 30px;
  width: 100%;
  height: 80vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default ChatBox