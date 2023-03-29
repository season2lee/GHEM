import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";
import logoTitle from "../../assets/image/for_logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);

  const moveToMyProfile = () => {
    if (userId) {
      navigate(`/profile/${userId}/gamelist`);
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    setIsLoginStatus(false);
    navigate("/");
  };

  useEffect(() => {
    if (userId) {
      setIsLoginStatus(true);
    }
  }, [userId]);

  return (
    <div css={navbar}>
      <NavLink to="/">
        <img src={logoTitle} alt="GHEM" css={title} />
      </NavLink>
      <div>
        <NavLink to="/main">main</NavLink>
        {isLoginStatus && <span onClick={moveToMyProfile}>profile</span>}
        {!isLoginStatus && <NavLink to="/login">login</NavLink>}
        {isLoginStatus && (
          <span id="logout" onClick={handleLogOut}>
            logout
          </span>
        )}
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
  a,
  span {
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
