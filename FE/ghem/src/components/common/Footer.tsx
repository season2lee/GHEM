import React from "react";
import { css } from "@emotion/react";

function Footer() {
  return <div css={footer}>Footer</div>;
}
const footer = css`
  transform: translateY(-100%);
  position: relative;
  bottom: 0;
`

export default Footer;
