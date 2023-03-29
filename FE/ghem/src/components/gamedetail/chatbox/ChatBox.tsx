import { css } from '@emotion/react'
import React, { useEffect, useState, useRef } from 'react'

import Header from './header/Header'
import Body from './body/Body'
import Footer from './footer/Footer'

import { dummyMessages } from './dummyMessages'
import { MessageType } from './body/MessageType'

function ChatBox() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    // setMessages(dummyMessages);
  }, [])
  
  return (
    <div css={container}>
      <Header />
      <Body messages={messages} bodyRef={bodyRef}/>
      <Footer setMessages={setMessages} scrollToBottom={scrollToBottom} />
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