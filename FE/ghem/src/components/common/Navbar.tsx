import { css } from "@emotion/react";
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
      <NavLink to="/" css={title}>
        <b>Ghem</b>
      </NavLink>
      <div>
        <NavLink to="/main">main</NavLink>
        <span onClick={moveToMyProfile}>profile</span>
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
  > div > span {
    cursor: pointer;
  }
  a {
    color: #f1eff4;
    padding: 0rem 1rem;
  }
  > a {
    padding: 1rem;
  }
`;

const title = css`
  font-size: 1.5rem;
`;

export default Navbar;
