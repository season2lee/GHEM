import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

type MessageProps = {
  msg: string,
  isSender: boolean
}

function Message({msg, isSender}: MessageProps) {
  return (
    <div css={container}>
      <StyledMessageBox isSender={isSender}>
        {msg}
      </StyledMessageBox>
    </div>
  )
}
const container = css`
  display: flex;
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