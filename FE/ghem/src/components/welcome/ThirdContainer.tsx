import React from 'react'
import { css } from '@emotion/react';
import steamLogo from "../../assets/image/steamLogo.png";

function ThirdContainer() {
  return (
    <div css={Layout} >
        <div css={Section} >
          <img src={steamLogo}></img>
        </div>
        <div css={Section}>ThirdContainer</div>
    </div>
    
  )
}

const Layout = css`
  scroll-snap-align: start;
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image: url(http://1nova.com/wallpapers/wp-content/uploads/sites/34/2015/02/Retro-80s-Arcade-Game.jpg);
`;

const Section = css`
  width:50%;
  text-align: center;
  img {
    filter:  invert(100%) sepia(1%) saturate(2%) hue-rotate(221deg) brightness(101%) contrast(101%);
  }
`;



export default ThirdContainer