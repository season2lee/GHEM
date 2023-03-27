import { atom } from "recoil";

// hover 했을 때 메인 창의 게임 리스트 움직임 멈추기 위한 상태관리
export const hoverEnter = atom<boolean>({
  key: "hoverEnter",
  default: false,
});

export type userInfoStateType = {
  user_id: number;
  nickname: string | null;
  steamId: string | null;
  introduce: string | null;
  userProfile: string | null;
};

export const userInfoState = atom<userInfoStateType>({
  key: "userInfoState",
  default: {
    user_id: 0,
    nickname: "",
    steamId: "",
    introduce: "",
    userProfile: "",
  },
});

// 게임 평가 후 추천 받은 게임 리스트

export type gameRecommendStateType = {
  app_id: number;
  title: string;
  genre: string;
  release_date: string;
  rating: number;
  rating_desc: string;
  positive_reviews: number;
  negative_reviews: number;
};

export const gameRecommendState = atom<gameRecommendStateType[]>({
  key: "gameRecommend",
  default: [],
});

export type evaluatedGameStateType = {
  app_id: number;
  rating: number;
};

export const evaluatedGameState = atom<evaluatedGameStateType[]>({
  key: "evaluatedGame",
  default: []
});
