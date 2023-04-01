import { atom } from "recoil";
import { userInfoStateType, contentInfoType } from "atomTypes";
import { specInfoType } from "apiTypes";

// 로그인 + 평점 준 게임이 있는 유저일 시 그 중 랜덤한 게임의 유사 게임 목록 받아올 state
export const loginRandomGameList = atom<number[]>({
  key: "loginRandomGameList",
  default: [],
});

export const userInfoState = atom<userInfoStateType>({
  key: "userInfoState",
  default: {
    user_id: 0,
    nickname: null,
    steamId: null,
    introduce: null,
    userProfile: null,
    birth: null,
    gender: null,
  },
});

export const contentInfoState = atom<contentInfoType>({
  key: "contentInfoState",
  default: {
    app_id: 0,
    user_game_id: 0,
    title: "",
    rating: 0,
    review: undefined,
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
// 비 로그인 시 추천 받은 비슷한 게임
export const gameRecommendState = atom<gameRecommendStateType[]>({
  key: "gameRecommend",
  default: [],
});

// 로그인 시 추천을 위해 평가 된 게임
export type evaluatedGameStateType = {
  steam_id: number;
  app_id: number;
  rating: number;
};

export const evaluatedGameState = atom<evaluatedGameStateType[]>({
  key: "evaluatedGame",
  default: [],
});

export type dbGameStateType = {
  app_id: number;
  rating: number;
  user_id: number;
};

export const dbGameState = atom<dbGameStateType[]>({
  key: "dbgame",
  default: [],
});

export const specInfoState = atom<specInfoType>({
  key: "specInfoState",
  default: {
    cpu_com: "",
    cpu_series: "",
    gpu_com: "",
    gpu_name: "",
    os: "",
    ram: 0,
    user_id: 0,
    spec_id: 0,
  },
});

export const modifiedSpecInfoState = atom<specInfoType>({
  key: "modifiedSpecInfoState",
  default: {
    cpu_com: "",
    cpu_series: "",
    gpu_com: "",
    gpu_name: "",
    os: "",
    ram: 0,
    user_id: 0,
    spec_id: 0,
  },
});

// 비로그인 시 추천을 위해 선택 된 게임

export const choiceGameState = atom<number[]>({
  key: "choiceGame",
  default: [],
});
