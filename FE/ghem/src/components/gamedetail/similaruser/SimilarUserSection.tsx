import { css } from '@emotion/react'
import React from 'react'

function SimilarUserSection() {
  return (
    <div css={container}>
      <h2>비슷한 유저들</h2>
    </div>
  )
}

const container = css`
  width: 100%;
`

export default SimilarUserSection