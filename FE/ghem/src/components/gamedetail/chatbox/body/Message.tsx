import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { MessageType } from './MessageType'

type MessageProps = {
  msg: MessageType,
  isSender: boolean
}

function Message({msg, isSender}: MessageProps) {
  if (isSender) {
    return (
      <div css={container}>
        <div css={senderMessageStyle}>
          {msg.content}
        </div>
      </div>
    )
  } else {
    return (
      <div css={container}>
        <img css={profileImageStyle} src={msg.profileURL} alt="" />
        <div css={msgContainer}>
          <p>{msg.nickname}</p>
          <div css={otherMessageStyle}>
            {msg.content}
          </div>
        </div>
      </div>
    )
  }
}
const container = css`
  display: flex;
  margin-top: 20px;
`

const profileImageStyle = css`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 10px;
`

const StyledMessageBox = styled.div<{isSender:boolean}>`
  background-color: ${(props) => (props.isSender ? "rgb(212, 206, 221)" : "rgb(117, 98, 146)")};
  color: black;
  font-size: 16px;
  margin: 5px 5px;
  max-width: 80%;
  margin-left: ${(props) => (props.isSender ? "auto" : "0px")};
  margin-right: ${(props) => (props.isSender ? "0px" : "auto")};
  padding: 10px;
  border-radius: 5px;
`

const senderMessageStyle = css`
  background-color: rgb(212, 206, 221);
  color: black;
  font-size: 16px;
  margin: 5px 5px;
  max-width: 80%;
  margin-left: auto;
  margin-right: 0px;
  padding: 10px;
  border-radius: 5px;
`

const otherMessageStyle = css`
  display: inline-block;
  background-color: rgb(117, 98, 146);
  color: black;
  font-size: 16px;
  margin: 5px 5px;
  margin-left: 0px;
  margin-right: auto;
  padding: 10px;
  border-radius: 5px;
`

const msgContainer = css`
  width: 80%;
  p {
    font-size: 16px;
  }
`

export default Message