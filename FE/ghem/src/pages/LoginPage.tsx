/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import loginBackground from "../assets/image/loginBackground.jpg";

function LoginPage() {
  return (
    <div css={wrapper}>
      <div css={linearWrapper}></div>
    </div>
  );
}

const wrapper = css`
  width: 100vw;
  height: 100vh;
  background-color: #292233;
`;

const linearWrapper = css`
  width: 100vw;
  height: 600px;
  background-image: linear-gradient(360deg, #292233 0%, rgba(41, 34, 51, 0) 169.72%), url(${loginBackground});
`;

export default LoginPage;
