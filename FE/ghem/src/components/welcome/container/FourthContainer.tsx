import React, { useRef } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import useIntersectionObsever from "@/util/hooks/useIntersectionObserver";
import gameChat from "@/assets/image/gameChat.png";
import { mobile } from "@/util/Mixin";

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
              <div className="card__message-box">같이 게임 하실분 구함(1/4)</div>
              <span className="card__message-time line figure"></span>
            </div>
            <div className="card__message card__message_my">
              <div className="card__message-box card__message-box_my">
               저요!</div>
              <span className="card__message-time line figure"></span>
            </div>
            <div className="card__message">
              <div className="card__message-box">이거 1단계 공략 아시는 분?</div>
              <span className="card__message-time line figure"></span>
            </div>
            <div className="card__message card__message_my">
              <div className="card__message-box card__message-box_my">그거 ~ 하면 됩니다</div>
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
      <div ref={ref} className={isInViewport ? "animation" : ""} css={textsection}>
      <h1>실시간 채팅 서비스</h1>
        <h2># 유저 간 실시간 소통 </h2>
        <h3>- 게임 도중 궁금한 점을 물어보고 싶은 경우</h3>
        <h3>- 멀티 플레이 게임을 하고 싶은데 같이 할 사람이 없는 경우</h3>      
      </div>
    </div>
  );
}

const layout = css`
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  ${mobile}{
    flex-direction: column;
  }
`;

const textsection = css`
  z-index: 100;
  height: 70vh;
  width: 30%;
  text-align: center;
  background-color:#352c425f ;
  border-radius: 1rem;
  margin-right: 10%;

  ${mobile} {
    margin: 0;
    height: 50%;
    width: 80%;
    padding-bottom: 20%;
    margin-top: 30%;
  }
  h1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    color: #ffffffef;
    text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45,
      0 0 7px #f6b4ffb9, 0 0 10px #f1c1ff53, 0 0 15px #ffd8f840,
      0 0 18px #eb68ffba, 0 0 23px #ffa9cb3a;
  }

  h2 {
    font-size: 1.5rem;
    margin: 2rem;
    text-align: start;
    font-weight: 500;
  }
  h3 {
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    text-align: start;
    font-weight: 400;
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
  
`


const section = css`
  z-index: 100;
  height: 100vh;
  width: 50%;
  text-align: center;
  

  ${mobile} {
    margin: 0;
    margin-left: 10%;
    margin-right: 10%;
    height: 50%;
    width:100%;
    margin-top:130%;
  }
  h3 { 
    font-weight: 100;
    background-color:#352C42 ;
    margin: 2rem;
    text-align: start;
    ${mobile}{
      font-size: 1rem;
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

const chatAni = css`
  --main-color: #352C42;
  --bg-color: transperent;
  --second-color: #E0E0E0;
  --my-messages-color: #463B58;
  --size: 2px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: body-animation 1s ease forwards infinite;

  ${mobile} {
    height: 30vh;
    margin: 2rem;
  }

  .card {
  background: #fff;
  width: 22rem;
  height: 31rem;
  box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.2);
  position: relative;

  ${mobile} {
    height:25rem;
  }
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
  ${mobile} {
    height:3rem;
  }
}

.card__main {
  padding: 40px 20px;

  ${mobile} {
    padding: 20px 10px;
  }
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
  font-size: 0.8rem;
  div{
    padding: 0.7rem;
  }
  
  
  
  
}
.card__message:nth-of-type(1) {
  animation: msg-animation 3s 1s ease forwards;
}
.card__message:nth-of-type(2) {
  animation: msg-animation 3s 3s ease forwards;
}

.card__message:nth-of-type(3) {
  animation: msg-animation 3s 5s ease forwards;
}
.card__message:nth-of-type(4) {
  animation: msg-animation 3s 7s ease forwards;
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

.loader__element:nth-of-type(1) {
  animation: preloader .9s ease-in-out alternate infinite;
}
.loader__element:nth-of-type(2) {
  animation: preloader .9s ease-in-out alternate .3s infinite;
}

.loader__element:nth-of-type(3) {
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
