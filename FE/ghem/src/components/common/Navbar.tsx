import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { FaPowerOff, FaSearch, FaUserCircle, FaHome } from "react-icons/fa";
import logoTitle from "../../assets/image/for_logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";

type searchResultDropdown = {
  appId: string;
  genre: string;
  rating: number;
  release_date: string;
  title: string;
};

function Navbar() {
  const navigater = useNavigate();
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchList, setSearchList] = useState<searchResultDropdown[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchPage, setSearchPage] = useState<number>(0);
  const { pathname } = useLocation();

  const moveToMyProfile = () => {
    if (userId) {
      navigater(`/profile/${userId}/gamelist`);
    }
  };

  useEffect(() => {
    setSearchList([]);
    setSearchWord("");
    setIsSearch(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSearch) {
      setSearchList([]);
      setSearchWord("");
    }
  }, [isSearch]);

  useEffect(() => {
    if (searchWord) {
      // console.log(searchPage, "---------------");
      getSearchList();
    }
  }, [searchWord, searchPage]);

  useEffect(() => {
    if (userId) {
      setIsLoginStatus(true);
    }
  }, [userId]);

  const inputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    setSearchPage(0);
  };

  // http://192.168.100.124:8080/search
  const getSearchList = async () => {
    try {
      const response = await axios.get(
        "http://j8d107.p.ssafy.io:32001/convenience/search",
        // "http://192.168.100.124:8080/search",
        {
          params: { search: searchWord, page: searchPage },
        }
      );
      setSearchList(response.data.data.content);
      // console.log(response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    setIsLoginStatus(false);
    navigater("/");
  };

  return (
    <div css={navbar}>
      <NavLink to="/">
        <img src={logoTitle} alt="GHEM" css={title} />
      </NavLink>
      <div>
        <NavLink to="/main">
          <FaHome size={20} />
        </NavLink>
        {isLoginStatus && (
          <a onClick={moveToMyProfile}>
            <FaUserCircle size={19} />
          </a>
        )}
        {!isLoginStatus && (
          <NavLink to="/login">
            <FaPowerOff fill="#aaffb7" />
          </NavLink>
        )}
        {isLoginStatus && (
          <>
            {/* 이건 나중에 css 수정하며 수정하겠슴다 */}
            <span id="logout" onClick={handleLogOut}>
              <FaPowerOff fill="#ff8484" />
            </span>
            <span>
              <FaSearch
                onClick={() => {
                  setIsSearch(!isSearch);
                }}
              />
              {isSearch && (
                <span>
                  <input
                    css={searchInput}
                    type="text"
                    onChange={inputWord}
                    value={searchWord}
                  />
                  {searchList.length !== 0 && (
                    <ul css={search} className="dropdown">
                      {searchList.map((search) => {
                        return (
                          <li
                            onClick={() => {
                              navigater(`../detail/${search.appId}`);
                            }}
                          >
                            {search.appId}
                          </li>
                        );
                      })}
                      <button
                        onClick={() => {
                          setSearchPage(searchPage + 1);
                        }}
                      >
                        next
                      </button>
                    </ul>
                  )}
                </span>
              )}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

const navbar = css`
  position: relative;
  z-index: 1000;
  height: 60px;
  /* background-color: #292233; */
  display: flex;
  justify-content: space-between;
  /* position: fixed;
  top: 0; */
  align-items: center;
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
    cursor: pointer;
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

const searchInput = css`
  background-color: black;
  border-radius: 0.5rem;
  height: 1.5rem;
  top: -1rem;
`;

const search = css`
  z-index: 500;
`;

export default Navbar;
