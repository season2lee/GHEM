import { css } from '@emotion/react'
import React from 'react'
import { MdOutlineDesktopWindows, MdOutlineDesktopAccessDisabled, MdWarningAmber } from "react-icons/md"

type IndicatorProps = {
  status: "playable" | "marginal" | "unplayable" | null
}

function Indicator({status}: IndicatorProps) {
  switch (status) {
    case "playable":
      return (
        <div css={container}>
          <div css={playableStyle} style={{backgroundColor: "rgb(40, 191, 46)"}}>
            <MdOutlineDesktopWindows />
            <p>쾌적</p>
          </div>
        </div>
      )
    case "marginal":
      return (
        <div css={container}>
          <div css={playableStyle} style={{backgroundColor: "rgb(255, 199, 0)"}}>
            <MdWarningAmber />
            <p>부족</p>
          </div>
        </div>
      )
    case "unplayable":
      return (
        <div css={container}>
          <div css={playableStyle} style={{backgroundColor: "red"}}>
            <MdOutlineDesktopAccessDisabled />
            <p>불가</p>
          </div>
        </div>
      )
    default:
      return <div></div>
  }
}

const container = css`
  display: inline-block;
`

const playableStyle = css`
  display: flex;
  align-items: center;
  p {
    font-size: 0.9rem;
    font-weight: bold;
    margin-left: 5px;
  }
  padding: 0.6rem;
  color: white;
  border-radius: 0.5rem;
`

export default Indicator