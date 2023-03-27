import { atom } from "recoil";
import { userInfoStateType, reviewInfoType } from "atomTypes";

// hover 했을 때 메인 창의 게임 리스트 움직임 멈추기 위한 상태관리
export const hoverEnter = atom<boolean>({
  key: "hoverEnter",
  default: false,
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

export const reviewInfoState = atom<reviewInfoType>({
  key: "reviewInfoState",
  default: {
    app_id: 0,
    user_game_id: 0,
    title: "",
    rating: 0,
    review: undefined,
  },
});
