import { css } from "@emotion/react";
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div css={navbar}>
      <NavLink to="/">Ghem</NavLink>
      <div>
        <NavLink to="/main">main</NavLink>
        <NavLink to="/login">login</NavLink>
      </div>
    </div>
  );
}

const navbar = css`
  height: 70px;
  background-color: #292233;
  display: flex;
  justify-content: space-between;
  /* position: fixed;
  top: 0; */
  width: 100%;
  div {
    padding: 1rem;
  }
  a {
    color: #f1eff4;
    padding: 0rem 1rem;
  }
  > a {
    padding: 1rem;
  }
`;

export default Navbar;
