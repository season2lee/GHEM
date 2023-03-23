import React from 'react'
import { css } from '@emotion/react';

function ThirdContainer() {
  return (
    <div css={Layout} >
        <div css={Section}>ThirdContainer</div>
        
    </div>
    
  )
}

const Layout = css`
  /* scroll-snap-align: start; */
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
 
`;

const Section = css`
  width:50%;
  text-align: center;
`;



export default ThirdContainer