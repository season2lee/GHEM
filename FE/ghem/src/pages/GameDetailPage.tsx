/* 보완할 점들
1. 존재하지 않는 APP_ID 입력시에 게임 정보가 없음을 표현하는 페이지로 렌더링 해야함
2. 스켈레톤 UI 적용 필요
3. 유저로부터 추천 여부 입력받는 컴포넌트는 따로 뺄 것
 */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { css } from '@emotion/react'
import ImageHead from '../components/game_detail/ImageHead'
import Section from '../components/Section'
import axios from 'axios'
import gamePadImgURL from "../assets/game-controller.png"

type GameDataType = {
  appID: string,
  name: string,
  shortDescription: string
}

function GameDetailPage() {
  const [gameData, setGameData] = useState<GameDataType | null>(null);  // 보여질 게임에 대한 상세 정보
  const [recommChoice, setRecommChoice] = useState<"recommended" | "notrecommended" | "notchosen">("notchosen");  // 추천 여부 선택 입력받기
  const appID = useParams().appid;  // URL의 path variable로 부터 APP_ID 추출
  const env = import.meta.env;

  // 게임 상세 정보 가져오기
  const loadGameData = async () => {
    const response = await axios.get(env.VITE_GAME_DETAIL + appID);
    const data = response.data[String(appID)].data;
    setGameData(() => {
      return {
        appID: data.steam_appid,
        name: data.name,
        shortDescription: data.short_description
      }
    })
  }
  
  useEffect(() => {
    loadGameData();
  }, [])
  
  return (
    <div>
      {/* 라이브러리 이미지를 가진 헤드 컴포넌트*/}
      {gameData &&
        <ImageHead gameData={gameData} recommChoice={recommChoice}/>
      }

      {/* 추천 여부 입력받는 컴포넌트 */}
      <div css={recommInputContainer}>
        <div css={recommInputContainerB}>
          <img src={gamePadImgURL} alt="" style={{width: '10rem'}}/>
          <h3>이 게임을 추천하시나요?</h3>
          <div>
            <button css={recommButtonStyle}>추천해요</button>
            <button css={recommButtonStyle}>추천해요</button>
          </div>
        </div>
      </div>
      {/* 채팅창 컴포넌트 */}
      {/* 리뷰 컴포넌트 */}
      <Section>
        <div>
          
        </div>
      </Section>
    </div>
  )
}

const recommInputContainer = css`
  width: 50%;
  display: flex;
  justify-content: center;
`

const recommInputContainerB = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const recommButtonStyle = css`
  background-color: rgb(0,117,255);
  color: white;
  padding: 1rem 1.5rem 1rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  box-shadow: none;
  border-radius: 30px;
  overflow: visible;
  cursor: pointer;
  &:hover {
    background-color: rgba(0,133,255);
  }
  transition-property: background-color;
  transition-duration: 300ms;
`

export default GameDetailPage