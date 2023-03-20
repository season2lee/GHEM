import { css } from '@emotion/react'
import React, { useState } from 'react'
import Body from './Body'
import { dummyMessages } from './dummyMessages'
import Footer from './Footer'
import Header from './Header'
import { MessageType } from './MessageType'

function ChatBox() {
  const [messages, setMessages] = useState<MessageType[]>(dummyMessages);
  return (
    <div css={container}>
      <Header />
      <Body messages={messages}/>
      <Footer setMessages={setMessages}/>
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