import React from "react";
import { css } from "@emotion/react";
import steamLogo from "../../assets/image/steamLogo.png";

function SecondContainer() {
  return (
    <div css={layout} >
        <div css={section}>SecondContainer</div>
        <div css={section}>
        <div css={slider}>
          <div css={slideTrack}>
            <div>
              <div css={slide}>
                <div css={text}>GHAM-</div>
                <div css={text}>GHAM-</div>
                <div css={text}>GHAM-</div>
                <div css={text}>GHAM-</div>
                <div css={text}>GHAM-</div>
                <div css={text}>GHAM-</div>
                </div>       
            </div>
          </div>
        </div>
        </div>
    </div>
    
  )
}

const layout = css`
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

const section = css`
  height: 50%;
  width: 100%;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;

`

const slider = css`
  border-top: solid 0.3rem;
  border-bottom: solid 0.3rem;
	height: 5rem;
	margin: auto;
	overflow:hidden;
	position: relative;
	width: 100%;
  justify-content: center;
  align-items: center;
  

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
const slideTrack = css`
    text-align: center;
    animation: scroll 10s linear infinite;
		display: flex;
		width: calc(10rem);
    border-bottom: 5rem;
  
  
`
const slide = css`
  display: flex; 
  color: white;

  
  @keyframes scroll {
	0% { transform: translateX(0); }
	100% { transform: translateX(calc(-18rem))}

  
}

`
const text = css`
  height: 5rem;
  font-size: 5rem;
  
`


export default SecondContainer;
