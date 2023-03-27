/* 보완할 점들
  1. 존재하지 않는 APP_ID 입력시에 게임 정보가 없음을 표현하는 페이지로 렌더링 해야함
  2. 스켈레톤 UI 적용 필요
  3. loadGameData()로 인해 렌더링이 두 번 연달아 일어나는 현상 고치기
*/

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ImageHead from '@components/gamedetail/imagehead/ImageHead'
import Section from '@components/common/Section'
import axios from 'axios'
import ChatBox from '@components/gamedetail/chatbox/ChatBox'
import { css } from '@emotion/react'
import ReviewSection from '@components/gamedetail/review/ReviewSection'

type GameDataType = {
  appID: string,
  name: string,
  shortDescription: string
}

function GameDetailPage() {
  const [gameData, setGameData] = useState<GameDataType | null>(null);  // 보여질 게임에 대한 상세 정보
  const [currentRating, setCurrentRating] = useState(0);
  const appID = useParams().appid;  // URL의 path variable로 부터 APP_ID 추출
  const env = import.meta.env;

  // 게임 상세 정보 가져오기
  const loadGameData = async () => {
    try {
      const response = await axios.get(env.VITE_GAME_DETAIL + appID);
      const data = response.data[String(appID)].data;
      setGameData(() => {
        return {
          appID: data.steam_appid,
          name: data.name,
          shortDescription: data.short_description
        }
      })
    } catch {
      console.log("gameData 불러오기 실패");
    }
  }

  const loadRatingData = async () => {
    try {
      const response = await axios.get(env.VITE_API_BASE_URL + "/review/check", {
        params: {
          app_id: appID,
          user_id: 9
        }
      });
      const data = response.data;
      console.log(data);
    } catch {
      console.log("ratingData 불러오기 실패");
    }
  }

  const postRatingData = async (rating: number) => {
    try {
      console.log("별점 등록 요청...");
      
      const response = await axios.post(env.VITE_API_BASE_URL + "/review", {
        app_id: appID,
        user_id: 9,
        rating: rating
      })
      const result = response.data;
      console.log(result);
    } catch {
      console.log("별점 등록 실패...");
    }
  }
  
  useEffect(() => {
    loadGameData();  // 렌더링을 두 번 연달아 일어나게 한다.
    loadRatingData();
  }, [])

  useEffect(() => {
    if (currentRating === 0) {
      // 삭제 요청하기
      return;
    } else {
      postRatingData(currentRating);
    }
  }, [currentRating])
  
  return (
    <div>
      {/* 라이브러리 이미지를 가진 헤드 컴포넌트*/}
      {gameData && <ImageHead gameData={gameData} currentRating={currentRating} setCurrentRating={setCurrentRating} />}

      <div css={container}>
        <div css={leftContainer}>
          {/* 리뷰 컴포넌트 */}
          <Section>
            <ReviewSection currentRating={currentRating} />
          </Section>
          <br />
          {/* 즐겨찾기한 유저들 컴포넌트 */}
          <Section>
            <div style={{width: "100%", height: "10rem"}}>즐겨찾기한 유저들 컴포넌트</div>
          </Section>
        </div>
        <div css={rightContainer}>
          {/* 채팅창 컴포넌트 */}
          <ChatBox />
        </div>
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
  padding: 50px;
  display: flex;
`

const leftContainer = css`
  width: 67%;
  padding: 0px 1rem 0px 0px;
`

const rightContainer = css`
  width: 33%;
  padding: 0px 0px 0px 1rem;
`

export default GameDetailPage