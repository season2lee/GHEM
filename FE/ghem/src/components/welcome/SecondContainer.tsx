import React from "react";
import { css } from "@emotion/react";

function SecondContainer() {
  return (
    <div css={Layout} >
        <div >SecondContainer</div>
        <div css={Slider}>
          <div css={SlideTrack}>
            <div>
              <div css={Slide}><h2>시준짱 시준짱 시준짱 시준짱 시준짱 시준짱 시준짱 시준짱 </h2></div>       
            </div>
          </div>
        </div>
    </div>
    
  )
}

const Layout = css`
  scroll-snap-align: start;
  width: 100%;
  height: 100vh;
  font-size: 1em;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Slider = css`
  border-top: solid 1px;
  border-bottom: solid 1px;
	height: 5rem;
	margin: auto;
	overflow:hidden;
	position: relative;
	width: 100%;

  &::before,
	&::after {
    background: linear-gradient(to right,  #20011f 0%,rgba(255,255,255,0) 100%);
		content: "";
		height: 100px;
		position: absolute;background: linear-gradient(to right,  #37093c 0%,rgba(255,255,255,0) 100%);
		width: 100px;
		z-index: 2;
	}
	
	&::after {
		right: 0;
		top: 0;
		transform: rotateZ(180deg);
	}

	&::before {
		left: 0;
		top: 0;
	}
`
const SlideTrack = css`
    animation: scroll 40s linear infinite;
		display: flex;
		width: calc(250px * 14);
`
const Slide = css`
  display: flex;
  
  font-size: 3rem;
  color: white;
  h2 { 
    width: 5rem;
    height: 3rem;
  }

  @keyframes scroll {
	0% { transform: translateX(0); }
	100% { transform: translateX(calc(-250px * 7))}
}
`


export default SecondContainer;
