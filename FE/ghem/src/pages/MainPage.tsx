import BannerTwo from "@components/main/BannerTwo";
import FixedButtom from "@components/main/FixedButtom";
import HoverGameItem from "@components/main/HoverGameItem";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoStateType } from "atomTypes";
import { userAllApp, userInfoState } from "@/store/mainState";
import Banner from "../components/main/Banner";
import Discount from "../components/main/Discount";
import FriendRecommend from "../components/main/FriendRecommend";
import SteadySeller from "../components/main/SteadySeller";
import TopRankNewRelease from "../components/main/TopRankNewRelease";
import axios from "axios";
import { useNavigate } from "react-router";

export type PageXY = {
  x: number;
  y: number;
};

function MainPage(props: {
  setCheckLogin: React.Dispatch<React.SetStateAction<boolean>>;
  randomAppid: number | undefined;
}) {
  const userId: number | null = Number(localStorage.getItem("id"));
  const userAge: number | null = Number(localStorage.getItem("id"));
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const [appid, setAppid] = useState<number | null>(null);
  const [colId, setColId] = useState<string>("empty");
  const [pageXY, setPageXY] = useState<PageXY>({ x: 0, y: 0 });
  const [canClickWithHover, setCanClickWithHover] = useState<boolean>(true);

  const [useAllApp, setUseAllApp] = useRecoilState<boolean>(userAllApp);
  const [userStatus, setUserStatus] =
    useRecoilState<userInfoStateType>(userInfoState);

  const navigate = useNavigate();

  useEffect(() => {
    props.setCheckLogin(true);
    haveRatingGame();
  }, []);

  useEffect(() => {
    if (userId) {
      setIsLoginStatus(true);
    }
  }, [userId]);

  useEffect(() => {
    console.log(useAllApp);
  }, [useAllApp]);

  const setBtnChange = () => {
    if (userId) {
      if (userStatus.birth) {
        const userAge =
          new Date().getFullYear() - new Date(userStatus.birth).getFullYear();
        if (userAge >= 19) {
          setUseAllApp(!useAllApp);
        } else {
          alert("성인이 아닙니다!");
        }
      } else {
        alert("생일을 입력하세요!");
      }
    } else {
      alert("로그인 하세요!");
    }
  };

  const haveRatingGame = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32000/user/rating/v2/${userId}`
        // `http://192.168.100.124:8080/rating/v2/${userId}`
      );
      const ids = response.data.data;
      // console.log("여기까진 된 건지", response);
      if (ids.length === 0) {
        navigate("/category");
      }
      // setRandomAppid(ids[Math.floor(Math.random() * ids.length)]);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div css={centerDiv}>
      <div className="toggle" style={{ right: "0" }}>
        <div css={switchBtn}>
          <div>
            <input
              type="checkbox"
              id="switch"
              checked={useAllApp}
              onChange={setBtnChange}
            />
            <label htmlFor="switch"></label>
          </div>
        </div>
      </div>
      <FixedButtom />
      {isLoginStatus && <Banner />}
      <BannerTwo
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        setPageXY={setPageXY}
        currentColId={colId}
        canClickWithHover={canClickWithHover}
        randomAppid={props.randomAppid}
      />
      <Discount
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        setPageXY={setPageXY}
        currentColId={colId}
        canClickWithHover={canClickWithHover}
      />
      <TopRankNewRelease
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        setPageXY={setPageXY}
        currentColId={colId}
        canClickWithHover={canClickWithHover}
      />
      {isLoginStatus && (
        <div>
          <hr />
          <FriendRecommend />
          <hr />
        </div>
      )}
      <SteadySeller
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        setPageXY={setPageXY}
        currentColId={colId}
        canClickWithHover={canClickWithHover}
      />
      먼가 깐지나는 말
      {isEnter && (
        <HoverGameItem
          setIsEnter={setIsEnter}
          appid={appid}
          colId={colId}
          pageXY={pageXY}
          setColId={setColId}
          setCanClickWithHover={setCanClickWithHover}
        />
      )}
    </div>
  );
}

const centerDiv = css`
  text-align: center;
  position: relative;

  .toggle {
    display: flex;
    justify-content: flex-end;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 0;
  }
`;

const switchBtn = css`
  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -99px;
    width: 80px;
    height: 40px;
    background: grey;
    display: block;
    border-radius: 40px;
    position: relative;
  }

  label:after {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 20px;
    transition: 0.2s;
  }

  input:checked + label {
    background: #52395a;
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 13px;
  }
`;

export default MainPage;
