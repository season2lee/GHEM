import { css } from '@emotion/react'
import React from 'react'

function StarRating() {
  return (
    <div>
      <span css={rate}>
        <button>★</button>
        <button>★</button>
        <button>★</button>
        <button>★</button>
        <button>★</button>
      </span>
    </div>
  )
}

const rate = css`
  button {
    font-size: 3rem;
    border: none;
    background-color: transparent;
    color: rgb(94, 78, 117);
    cursor: pointer;
    &:hover ~ button {
      background-color: transparent;
      color: rgb(94, 78, 117);
    }
  }
  &:hover {
    button {
      color: #fc0
    }
  }
`

export default StarRating