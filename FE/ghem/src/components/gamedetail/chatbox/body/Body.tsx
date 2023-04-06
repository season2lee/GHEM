/* 구현할 것들
  1. 상위에 다다르면 요청 추가로 보내어 이전 채팅값 가져올 것(=무한 스크롤)
  2. 날짜 경계선
*/
import { css } from '@emotion/react'
import React, { useEffect, useRef, forwardRef } from 'react'
import Message from './Message';
import { MessageType } from './MessageType';

type BodyProps = {
  messages: MessageType[],
  userID: number
}

function Body({messages, userID}: BodyProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // 스크롤 위치 맨 아래에서 시작함
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages])

  return (
    <div css={container} ref={bodyRef}>
      {messages.map((message, index) => <Message key={index} msg={message} isSender={message.userID === userID}/>)}
    </div>
  )
}

const container = css`
  height: 100%;
  overflow-y: auto;
  background-color: rgb(53, 44, 66);
  padding: 5px 10px 5px 10px;
`

export default Body