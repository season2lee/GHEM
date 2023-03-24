import { css } from "@emotion/react";
import React from "react";
import logoTitle from "../../assets/image/for_logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userId: number | null = Number(localStorage.getItem("id"));

  const moveToMyProfile = () => {
    if (userId) {
      navigate(`/profile/${userId}/gamelist`);
    }
  };

  return (
    <div css={navbar}>
      <NavLink to="/">
        <img src={logoTitle} alt="GHEM" css={title} />
      </NavLink>
      <div>
        <NavLink to="/main">main</NavLink>
        <span onClick={moveToMyProfile}>profile</span>
        <NavLink to="/login">login</NavLink>
        <NavLink to="/logout" id="logout">
          logout
        </NavLink>
      </div>
    </div>
  );
}

const navbar = css`
  height: 60px;
  /* background-color: #292233; */
  display: flex;
  justify-content: space-between;
  /* position: fixed;
  top: 0; */
  width: 100%;
  div {
    padding: 1rem;
  }
  > div > span {
    cursor: pointer;
  }
  a {
    color: #f1eff4;
    margin: 0rem 1rem;
  }
  & a.active {
    color: #ca97f3;
  }
  & a:hover {
    color: #aaffb7;
  }
  #logout:hover {
    color: #ff8484;
  }
`;

const title = css`
  width: 5rem;
  height: auto;
  margin: 0.8rem;
`;

export default Navbar;
