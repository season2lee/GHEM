import React, { useRef } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import useIntersectionObsever from "@/util/hooks/useIntersectionObserver";
import gameChat from "@/assets/image/gameChat.png";

function ForthContainer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useIntersectionObsever(ref);

  return (
    <div css={layout}>
      <div
        ref={ref}
        className={isInViewport ? "animation" : ""}
        css={section}
      >
        <div css={chatAni}>

        <div className="card">
          <div className="card__header">
            <a href="#">
              <span className="circle figure"></span>
            </a>
            <button className="card__menu burger btn">
              <span className="line burger__line figure"></span>
              <span className="line burger__line burger__line_second figure"></span>
              <span className="line burger__line figure"></span>
            </button>
          </div>
          <div className="card__main">
            <div className="card__message">
              <div className="card__message-box"></div>
              <span className="card__message-time line figure"></span>
            </div>
            <div className="card__message card__message_my">
              <div className="card__message-box card__message-box_my"></div>
              <span className="card__message-time line figure"></span>
            </div>
            <div className="card__message">
              <div className="card__message-box"></div>
              <span className="card__message-time line figure"></span>
            </div>
            <div className="card__message card__message_my">
              <div className="card__message-box card__message-box_my"></div>
              <span className="card__message-time line figure"></span>
            </div>
          </div>
          <div className="card__footer">
            <div className="loader">
              <span className="loader__element"></span>
              <span className="loader__element"></span>
              <span className="loader__element"></span>
            </div>
            <form action="" className="form">
              <input type="text" className="form__input" />
              <button className="btn form__send">
                <span className="line figure"></span>
              </button>
            </form>
          </div>
        </div>
        </div>
      </div>
      <div ref={ref} className={isInViewport ? "animation" : ""} css={section}>
        <h3>
          무슨 게임 할 지 항상 고민 하셨나요?
          <br />
          steam에서 추천해주는 게임이 지루하셨나요?
          <br />
          까다로운 당신의 취향에 딱 맞는 서비스를 받아보세요
          <br />
        </h3>
      </div>
    </div>
  );
}

const layout = css`
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const section = css`
  z-index: 100;
  height: 100vh;
  width: 50%;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 100%;
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

const chatAni = css`
  --main-color: #352C42;
  --bg-color: transperent;
  --second-color: #E0E0E0;
  --my-messages-color: #463B58;
  --size: 2px;

  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: body-animation 1s ease forwards infinite;

  .card {
  background: #fff;
  width: 22rem;
  height: 31rem;
  box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.2);
  position: relative;
  opacity: 0;
  animation: card-animation 10s 1s ease forwards;
}

.card__header {
  height: 5rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  background-color: var(--main-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  animation: header-animation 8s 1s ease forwards;
}

.card__main {
  padding: 40px 20px;
}

.card__footer {
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  background: var(--second-color);
  opacity: 0;
  animation: footer-animation 8s 1s ease forwards;
}

.figure {
  display: block;
  background: var(--second-color);
}

.line {
  width: 3rem;
  height: 0.5rem;
  border-radius:  0.5rem;
}

.line_small {
  height: 1px;
  width: 100%;
}

.circle {
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
}

.burger {
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}

.form__input {
  border: none;
  padding: 5px 10px;
  border-radius: 20px;
  opacity: 0;
  animation: input-animation 10s 1s ease forwards;
}

.form__send {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--main-color);
  color: #fff;
  font-family: sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  opacity: 0;
  animation: send-animation 8s 1s ease forwards;
}

.burger__line {
  height: 0.2rem;
  width: 2rem;
}

.burger__line_second {
  animation: burger-animation 2s 10s forwards infinite;
}

.card__message {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  transform: scale(0);
  
  
}
.card__message:nth-child(1){
  animation: msg-animation 9s 1s ease forwards infinite;
}
.card__message:nth-child(2){
  animation: msg-animation 7s 3s ease forwards infinite;
}

.card__message:nth-child(3){
  animation: msg-animation 5s 5s ease forwards infinite;
}
.card__message:nth-child(4){
  animation: msg-animation 3s 10s ease forwards infinite;
}


.card__message_my {
  align-items: flex-end;
}

.card__message-box {
  background: var(--second-color);
  height: 2.5rem;
  width: 200px;
  border-radius: 5px;
  margin-bottom: 5px;
}
.card__message-box_my {
  background: var(--my-messages-color);
}


/* Animations */

.loader {
  position: absolute;
  left: 0;
  right: 0;
  top: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader__element {
  border-radius: 100%;
  border: var(--size) solid var(--second-color);
  margin: calc(var(--size)*2);
}

.loader__element:nth-child(1) {
  animation: preloader .9s ease-in-out alternate infinite;
}
.loader__element:nth-child(2) {
  animation: preloader .9s ease-in-out alternate .3s infinite;
}

.loader__element:nth-child(3) {
  animation: preloader .9s ease-in-out alternate .6s infinite;
}
  
@keyframes preloader {
  100% {
    border: var(--size) solid var(--main-color);
    transform: scale(2);
  }
}

@keyframes body-animation {
  100% { background: var(--bg-color); }
}

@keyframes card-animation {
  100% { opacity: 1; }
}

@keyframes header-animation {
  100% { opacity: 1; }
}

@keyframes burger-animation {
  100% { transform: scaleX(0.5) translateX(15px); }
}

@keyframes msg-animation {
  100% { transform: scale(1); }
}

@keyframes footer-animation {
  100% { opacity: 1; }
}

@keyframes input-animation {
  100% { opacity: 1;}
}

@keyframes send-animation {
  100% {  opacity: 1; }
}

@keyframes card-animation {
  100% { opacity: 1; }
}
`

export default ForthContainer;
