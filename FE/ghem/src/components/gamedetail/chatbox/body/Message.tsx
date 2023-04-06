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
      <div>
        {msg.content}
      </div>
    )
  }
  return (
    <div css={container}>
      {!isSender &&
        <img css={profileImageStyle} src={msg.profileURL} style={{}} />
      }
      <StyledMessageBox isSender={isSender}>
        {msg.content}
      </StyledMessageBox>
    </div>
  )
}
const container = css`
  display: flex;
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
export default Message