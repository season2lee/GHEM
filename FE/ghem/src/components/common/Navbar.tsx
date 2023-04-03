import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { FaPowerOff, FaSearch, FaUserCircle, FaHome } from "react-icons/fa";
import logoTitle from "../../assets/image/for_logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";
import { getSearchList } from "@/api/search";


type searchResultDropdown = {
  appId: string;
  genre: string;
  rating: number;
  release_date: string;
  title: string;
};

type gameType = {
  appId: string;
  genre: string;
  negative_reviews: number;
  positive_reivews: number ; 
  rating: number;
  rating_desc: string;
  release_date: string;
  title: string;
}
type responseType = {
  content: gameType[];
 
}

function Navbar() {
  const navigater = useNavigate();
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchList, setSearchList] = useState<searchResultDropdown[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchPage, setSearchPage] = useState<number>(0);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState<{}>({})

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
      setSearchValue({ search: searchWord, page: searchPage })
      // getSearchList()
    }
  }, [searchWord, searchPage]);

  useEffect(()=>{
    SearchList(searchValue);
  },[searchValue])

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
  const SearchList = async (param:{}) => {
      const response:any = await getSearchList(param)
      if (response) {
        setSearchList(response);
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
      <div css={menu}>
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
                    <div css={search} className="dropdown">
                      {searchList.map((search) => {
                        return (
                          <div key={search.appId}
                            onClick={() => {
                              navigater(`../detail/${search.appId}`);
                            }}
                          >
                            {search.appId}
                          </div>
                        );
                      })}
                      <button
                        onClick={() => {
                          setSearchPage(searchPage + 1);
                        }}
                      >
                        next
                      </button>
                    </div>
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
  top:0px;
  bottom:0px;
  left: 0px;
  right: 0px;
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

const menu = css`
  position: absolute;
  top:0rem;
  bottom: 0rem;
  right: 0rem;
  left: 0rem;
  text-align: end;
  align-items: center;
`

const searchInput =css`
  border-radius: 0.5rem;
  border: none;
  width: 20%;
  box-shadow:inset .2rem .2rem .5rem #15121b,
  inset -.2rem -.2rem .5rem #5a4b70;
  background:none;
  padding-top: 0.5rem;
  text-align: center;
  color: white;
  
  &:focus {
    outline: none;
  }


`

const search = css`
  background:#292233;
  right: 0px; 
  width: 20%;
  z-index: 500;
  display: flex;
  flex-direction: column;
  border-radius: 0.2rem;
  box-shadow: .2rem .2rem .5rem #15121b,
  -.2rem -.2rem .5rem transparent;
  position: absolute;
  text-align: start;
  margin-right: 3rem;
  div{
    border-bottom: 1px solid white;

  }
`

export default Navbar;
