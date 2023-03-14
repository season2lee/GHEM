import { css } from '@emotion/react'
import React from 'react'

type SectionProps = {
  children: React.ReactNode
}

function Section({children}: SectionProps) {
  return (
    <div css={sectionstyle}>{children}</div>
  )
}

const sectionstyle = css`
  background-color: rgb(53,44,66);
  padding: 2rem;
  border-radius: 30px;
`

export default Section