/* 보완할 점들
  1. 존재하지 않는 APP_ID 입력시에 게임 정보가 없음을 표현하는 페이지로 렌더링 해야함
  2. 스켈레톤 UI 적용 필요
*/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ImageHead from "@components/gamedetail/imagehead/ImageHead";
import Section from "@components/common/Section";
import axios from "axios";
import ChatBox from "@components/gamedetail/chatbox/ChatBox";
import { css } from "@emotion/react";
import ReviewSection from "@components/gamedetail/review/ReviewSection";
import GameInfo from "@components/gamedetail/gameinfo/GameInfo";
import SimilarUserSection from "@components/gamedetail/similaruser/SimilarUserSection";
import { mobile, tabletH } from "@/util/Mixin";
import { getUserID } from "@/api/user";

const BROKER_URL = "ws://192.168.100.209:8080/ws";

type GameDataType = {
  appID: string;
  name: string;
  shortDescription: string;
};

function GameDetailPage() {
  const [gameData, setGameData] = useState<GameDataType | null>(null); // 보여질 게임에 대한 상세 정보
  const [currentRating, setCurrentRating] = useState(0);
  const [userID, setUserID] = useState<number | null>(null);
  const appID = useParams().appid; // URL의 path variable로 부터 APP_ID 추출
  const env = import.meta.env;

  /*-------------------------- API 요청 함수들... --------------------------*/
  // 게임 상세 정보 가져오기
  const getGameData = async () => {
    try {
      const response = await axios.get(env.VITE_GAME_DETAIL + appID + "&filters=basic");
      const data = response.data[String(appID)].data;
      setGameData(() => {
        return {
          appID: data.steam_appid,
          name: data.name,
          shortDescription: data.short_description,
        };
      });
    } catch {
      console.log("gameData 불러오기 실패");
    }
  };

  // 유저가 매긴 평점 가져오기
  const getRatingData = async () => {
    try {
      const response = await axios.get(`${env.VITE_API_BASE_URL}/rating/${userID}/${appID}`);
      const { data } = response.data;
      const rating = data?.rating ?? 0;
      console.log("ratingData:", rating);
      setCurrentRating(() => {
        return rating;
      })
    } catch {
      console.log("ratingData 불러오기 실패");
    }
  };

  // 유저가 매긴 평점 삭제하기
  const deleteRatingData = async () => {
    try {
      if (userID !== null) {
        await axios.delete(`${env.VITE_API_BASE_URL}/rating`, {
          params: {
            user_id: userID,
            app_id: appID
          }
        });
        alert("삭제 완료!");
      }
    } catch {
      console.log("평점 삭제 실패...");
    }
  };

  // 유저가 매긴 평점 등록하기
  const postRatingData = async (rating: number) => {
    try {
      if (userID !== null) {
        await axios.post(`${env.VITE_API_BASE_URL}/rating`, {
          app_id: appID,
          user_id: userID,
          rating: rating
        });
        alert("등록 완료!");
      }
    } catch {
      console.log("평점 등록 실패...");
    }
  };

  // 유저가 매긴 평점 변경하기
  const putRatingData = async (rating: number) => {
    try {
      if (userID !== null) {
        await axios.put(env.VITE_API_BASE_URL + "/rating", {
          app_id: appID,
          user_id: userID,
          rating: rating
        });
        alert("변경 완료!");
      }
    } catch {
      console.log("평점 변경 실패...");
    }
  };

  // 별점 클릭한 이벤트에 대한 핸들러
  const ratingHandler = (newRating: number) => {
    if (newRating === 0) {
      // 별점 취소한 경우
      setCurrentRating(() => {
        deleteRatingData();
        return 0;
      });
    } else {
      setCurrentRating((oldState) => {
        if (oldState === 0) {
          // 새로운 별점을 입력한 경우
          postRatingData(newRating);
        } else {
          // 기존의 별점을 변경한 경우
          putRatingData(newRating);
        }
        return newRating;
      });
    }
  };

  const setUserLoginState = () => {
    setUserID((oldState) => {
      return getUserID();
    })
  }
  /*----------------------------------------------------*/

  useEffect(() => {
    getGameData();
  }, [appID]);

  useEffect(() => {
    setUserLoginState();
    if (userID !== null) {
      getRatingData();
    }
  }, [userID])

  if (userID) {
    return (
      <div>
        {/* 라이브러리 이미지를 가진 헤드 컴포넌트*/}
        {appID && <ImageHead appID={appID} />}
  
        {/* 게임정보 컴포넌트 */}
        <div css={container}>
          <GameInfo
            gameData={gameData}
            currentRating={currentRating}
            ratingHandler={ratingHandler}
          />
          <div css={topContainer}>
            <div css={leftContainer}>
              {/* 리뷰 컴포넌트 */}
              <Section>
                <ReviewSection currentRating={currentRating} />
              </Section>
              {/* 즐겨찾기한 유저들 컴포넌트 */}
              <br />
              <Section>
                <SimilarUserSection />
              </Section>
            </div>
            <div css={rightContainer}>
              {/* 채팅창 컴포넌트 */}
              <ChatBox brokerUrl={BROKER_URL} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>로그인 먼저 하세욤</div>
    )
  }
}

const container = css`
  padding: 0px 2.5rem 2.5rem 2.5rem;
  ${mobile} {
    padding: 0px 2rem 2rem 2rem;
  }
`;

const topContainer = css`
  width: 100%;
  margin-top: 100px;
  display: flex;
  ${tabletH} {
    margin-top: 35px;
    flex-direction: column-reverse;
  }
`;

const leftContainer = css`
  width: 67%;
  padding: 0px 1rem 0px 0px;
  ${tabletH} {
    width: auto;
    padding: 0px 0px 0px 0px;
  }
`;

const rightContainer = css`
  width: 33%;
  padding: 0px 0px 0px 1rem;
  ${tabletH} {
    width: auto;
    padding: 0px 0px 0px 0px;
    margin-bottom: 25px;
  }
`;

export default GameDetailPage;
