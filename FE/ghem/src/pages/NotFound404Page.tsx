import React from "react";
import { css } from "@emotion/react";
import GameCanvas from "@components/common/GameCanvas";
import { useNavigate } from "react-router";

function NotFound404Page() {
  const navigate = useNavigate();
  const moveToMainPage = () => {
    navigate("/main");
  };
  return (
    <div css={container}>
      <div className="glitch_word_box">
        <div className="line"></div>
        <h1 id="word" className="glitch_word0">
          404 page not found
        </h1>
        <h1 id="word1" className="glitch_word1">
          404 page not found
        </h1>
        <h1 id="word2" className="glitch_word2">
          404 page not found
        </h1>
      </div>
      <div css={game}>
        <GameCanvas />
        <button css={btn} onClick={moveToMainPage}>
          Home
        </button>
      </div>
    </div>
  );
}

const btn = css`
  width: 8rem;
  height: 2rem;
  border-radius: 5px;
  padding: 7px 10px;
  border: none;
  color: white;
  background-color: rgb(88, 74, 110);
  cursor: pointer;
  &:hover {
    background-color: rgb(117, 98, 146);
  }
  margin: 5%;
  margin-bottom: 0;
`;

const container = css`
  display: inline-flex;
  justify-content: center;
  text-align: center;
  width: 99%;
  flex-direction: column;

  h1 {
    color: #f5f5f5;
    font-weight: bolder;
    font-size: 5em;
    margin: 0;
    outline: none;
    padding: 0;
    position: relative;
  }

  .glitch_word_box {
    height: 100px;
    line-height: 100px;
    position: relative;

    -webkit-animation: disappear 1s linear;
    -webkit-animation-iteration-count: infinite, infinite;
    -moz-animation: disappear 1s linear;
    -moz-animation-iteration-count: infinite, infinite;
    -o-animation: disappear 1s linear;
    -o-animation-iteration-count: infinite, infinite;
  }

  .glitch_word_box .glitch_word0 {
    position: absolute;
    width: 100%;
  }

  .glitch_word_box .glitch_word1 {
    color: red;
    font-weight: bolder;
    left: -2px;
    position: absolute;
    top: -2px;
    width: 100%;
    z-index: -1;

    -webkit-animation: animate_glitch_1 0.2s linear;
    -webkit-animation-iteration-count: infinite;
    -moz-animation: animate_glitch_1 0.2s linear;
    -moz-animation-iteration-count: infinite;
    -o-animation: animate_glitch_1 0.2s linear;
    -o-animation-iteration-count: infinite;
  }

  .glitch_word_box .glitch_word2 {
    color: blue;
    font-weight: bolder;
    left: 2px;
    position: absolute;
    top: 2px;
    width: 100%;
    z-index: -1;

    -webkit-animation: animate_glitch_2 0.3s linear;
    -webkit-animation-iteration-count: infinite;
    -moz-animation: animate_glitch_2 0.3s linear;
    -moz-animation-iteration-count: infinite;
    -o-animation: animate_glitch_2 0.3s linear;
    -o-animation-iteration-count: infinite;
  }

  @-webkit-keyframes disappear {
    0% {
      opacity: 0;
    }
    2% {
      opacity: 1;
    }
  }

  @-webkit-keyframes animate_glitch_1 {
    0% {
      top: 1px;
      left: 1px;
    }
    25% {
      top: 3px;
      left: 2px;
    }
    50% {
      top: -1px;
      left: -4px;
    }
    75% {
      top: 2px;
      left: 5px;
    }
    100% {
      top: 1px;
      left: -2px;
    }
  }

  @-webkit-keyframes animate_glitch_2 {
    0% {
      top: -1px;
      left: -1px;
    }
    25% {
      top: -3px;
      left: -2px;
    }
    50% {
      top: 1px;
      left: 4px;
    }
    100% {
      top: -1px;
      left: -1px;
    }
  }

  @-moz-keyframes disappear {
    0% {
      opacity: 0;
    }
    2% {
      opacity: 1;
    }
  }

  @-moz-keyframes animate_glitch_1 {
    0% {
      top: 1px;
      left: 1px;
    }
    25% {
      top: 3px;
      left: 2px;
    }
    50% {
      top: -1px;
      left: -4px;
    }
    75% {
      top: 2px;
      left: 5px;
    }
    100% {
      top: 1px;
      left: -2px;
    }
  }

  @-moz-keyframes animate_glitch_2 {
    0% {
      top: -1px;
      left: -1px;
    }
    25% {
      top: -3px;
      left: -2px;
    }
    50% {
      top: 1px;
      left: 4px;
    }
    100% {
      top: -1px;
      left: -1px;
    }
  }

  @-o-keyframes disappear {
    0% {
      opacity: 0;
    }
    2% {
      opacity: 1;
    }
  }

  @-o-keyframes animate_glitch_1 {
    0% {
      top: 1px;
      left: 1px;
    }
    25% {
      top: 3px;
      left: 2px;
    }
    50% {
      top: -1px;
      left: -4px;
    }
    75% {
      top: 2px;
      left: 5px;
    }
    100% {
      top: 1px;
      left: -2px;
    }
  }

  @-o-keyframes animate_glitch_2 {
    0% {
      top: -1px;
      left: -1px;
    }
    25% {
      top: -3px;
      left: -2px;
    }
    50% {
      top: 1px;
      left: 4px;
    }
    100% {
      top: -1px;
      left: -1px;
    }
  }
`;
const game = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  flex-direction: column
`;

export default NotFound404Page;
