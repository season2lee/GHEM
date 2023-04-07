import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import useIntersectionObsever from "@/util/hooks/useIntersectionObserver";
import computerChecked from "@/assets/image/computerChecked.png";
import { mobile } from "@/util/Mixin";
import scarce from "@/assets/image/scarce.png";
import unsuitable from "@/assets/image/unsuitable.png";
import suitable from "@/assets/image/suitable.png";

function FifthContainer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useIntersectionObsever(ref);
  const [gameOne, setGameOne] = useState<boolean>(false);
  const [gameTwo, setGameTwo] = useState<boolean>(false);
  const [gameThree, setGameThree] = useState<boolean>(false);

  const ClickOneGame = () => {
    setGameOne(!gameOne);
    setGameTwo(false);
    setGameThree(false);
  };

  const ClickTwoGame = () => {
    setGameOne(false);
    setGameTwo(!gameTwo);
    setGameThree(false);
  };

  const ClickThreeGame = () => {
    setGameOne(false);
    setGameTwo(false);
    setGameThree(!gameThree);
  };

  return (
    <div css={layout}>
      <div
        ref={ref}
        className={isInViewport ? "animation" : ""}
        css={textsection}
      >
        <h1>PC 환경 적합도 <br /> 분석 서비스</h1>
        <h2># PC 환경 비교 </h2>
        <h3> 게임 구매하고 사양이 달라 게임을 못한 경우</h3>
        <h3> PC 환경이 적절하지 않아 게임 플레이에 불편을 느끼는 경우</h3>
      </div>
      <div ref={ref} className={isInViewport ? "animation" : ""} css={section}>
        <div className="monitor">
          <div className="screen">
            {gameOne ? <img src={scarce}></img> : null}
            {gameTwo ? <img src={unsuitable}></img> : null}
            {gameThree ? <img src={suitable}></img> : null}
          </div>
        </div>
        <div className="keyboard"></div>
        <div css={buttons}>
          <button onClick={ClickOneGame}>Game1</button>
          <button onClick={ClickTwoGame}>Game2</button>
          <button onClick={ClickThreeGame}>Game3</button>
        </div>
        <div css={buttonText}>on Click button!</div>
      </div>
    </div>
  );
}

const layout = css`
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  ${mobile} {
    flex-wrap: wrap;
    margin-top: 100%;
  }
`;

const textsection = css`
  z-index: 100;
  height: 70vh;
  width: 50%;
  text-align: center;
  background-color: #352c425f;
  margin-left: 10%;
  border-radius: 1rem;

  ${mobile} {
    margin: 0;
    height: 50%;
    width: 80%;
  }
  h1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    color: #ffffffef;
    text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45,
      0 0 7px #f6b4ffb9, 0 0 10px #f1c1ff53, 0 0 15px #ffd8f840,
      0 0 18px #eb68ffba, 0 0 23px #ffa9cb3a;
    
      ${mobile} {
        font-size: 1.7rem;
      }
  
    }

  h2 {
    font-size: 1.3rem;
    margin: 2rem;
    text-align: start;

    color: #23152a;
    text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45,
    0 0 2px #f6b4ffb9, 0 0 5px #f1c1ff53, 0 0 8px #ffd8f840, 0 0 5px #eb68ffba,
    0 0 5px #ffa9cb3a;

    ${mobile} {
        font-size: 1.2rem;
      }
  }
  h3 {
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    text-align: start;
    font-weight: 400;
    color: #ffffffef;
    text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45,
      0 0 7px #f6b4ffb9, 0 0 10px #f1c1ff53, 0 0 15px #ffd8f840,
      0 0 18px #eb68ffba, 0 0 23px #ffa9cb3a;
    ${mobile} {
      font-size: 0.7rem;
    }
  }
  &.animation {
    animation-name: opacity;
    animation-duration: 1000ms;

    @keyframes opacity {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const section = css`
  z-index: 100;
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 50%;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  margin-top: 10%;
  ${mobile} {
    width: 100%;
    height: 50%;
  }
  .monitor {
    width: 22rem;
    height: 14.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    border: 1px solid black;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    ${mobile} {
      width: 15rem;
      height: 10rem;
    }
  }

  .null {
    height: 100%;
  }

  .screen {
    width: 90%;
    height: 90%;
    background-color: #472654;
    color: black;
    
  }

  .keyboard {
    width: 25rem;
    height: 2rem;
    padding: 1rem;
    background-color: white;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    ${mobile}{
      width: 18rem;
      height: 1.3rem;
    }
  }

  div {
    /* margin: 5px;
    width: 5rem; */
    /* border-radius: 0.5rem;
    &:hover{
      color:red;
    } */
  }
  img {
    width: 100%;
    object-fit: fill;
  }

  &.animation {
    animation-name: opacity;
    animation-duration: 5000ms;

    @keyframes opacity {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const buttons = css`
  display: inline-flex;
  padding: 1rem;
  text-align: center;
  justify-content: center;
  button {
    margin: 1rem;
    z-index: 100;
    border: 0.5rem solid white;
    width: 4rem;
    border-radius: 0.5rem;
    color: #ffffffef;
    text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45, 0 0 7px #f6b4ffb9, 0 0 10px #f1c1ff53,
      0 0 15px #ffd8f840, 0 0 18px #eb68ffba, 0 0 23px #ffa9cb3a;
    cursor: pointer;
    :nth-of-type(1) {
      background-color: #ede53d;
      border-color: #ede53d;
    }
    :nth-of-type(2) {
      background-color: #f44ba2;
      border-color: #f44ba2;
    }
    :nth-of-type(3) {
      background-color: #159452;
      border-color: #159452;
    }
  }
`;
const buttonText = css`
  position: relative;
  animation: bounce 1s infinite linear;
  font-size: 2rem;
  @keyframes bounce {
    0% {
      top: 0;
    }

    25% {
      top: -5px;
    }

    50% {
      top: -10px;
    }

    75% {
      top: -5px;
    }

    100% {
      top: 0;
    }
  }

  ${mobile} {
        font-size: 1.2rem;
      }
`;

export default FifthContainer;
