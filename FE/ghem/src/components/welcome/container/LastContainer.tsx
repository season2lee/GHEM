import React from 'react'
import { css } from '@emotion/react';
import { useNavigate } from 'react-router';
import useIntersectionObsever from '@/util/hooks/useIntersectionObserver';


function LastContainer() {
    const navigate = useNavigate();

    const CategoryHandler = () => {
      navigate("/category");
    };
  
    return (
      <div css={layout}>
		<div css={circle}>
          </div>
        <div css={section}>
          <button css={button} onClick={CategoryHandler}>추천받기</button>
        </div>
      </div>
    );
  }
  const layout = css`
    /* scroll-snap-align: start; */
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
    height:50%;
    text-align: center;
  `;

  const button = css`
  z-index: 100;
  	display: inline-block; 
	padding: 20px 40px;
	color: white;
	position: relative;
	left: 50%;
	transform: translate(-50%, -50%);
	vertical-align: middle;
	text-decoration: none;
	font-size: 4vw;
	transition: all .5s;
	background-color: #bf34db;
  border-radius: 1rem;

	&::before {
		bottom: -15px;
		height: 15px;
		width: 100%;
		left: 8px;
		transform: skewX(45deg);
		background-color: darken(#d334db, 20%);
	}

	&::after {
		right: -15px;
		height: 100%;
		width: 15px;
		bottom: -8px;
		transform: skewY(45deg);
		background-color: darken(#d334db, 30%);
	}

	&:active {
		margin-left: 10px;
		margin-top: 10px;
		&::before {
			bottom: -5px;
			height: 5px;
			left: 3px;
		}
		
    &::after {
			right: -5px;
			width: 5px;
			bottom: -3px;
		}	
	}
  `
  const circle = css`
  z-index: 1;
  position: relative;
  top: 10rem;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background: linear-gradient(45deg, transparent, transparent 0%, #d400ff),
    linear-gradient(transparent);
  animation: rotate 1.5s linear infinite;

  ::before,
  ::after {
    content: " ";
    position: absolute;
    inset: 8px;
    background: linear-gradient(transparent);
    border-radius: inherit;
  }
  ::before {
    background: linear-gradient(45deg, transparent, transparent 0%, #0095ff);
    filter: blur(32px);
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
      filter: hue-rotate(90deg);
    }
  }
`;

  
export default LastContainer