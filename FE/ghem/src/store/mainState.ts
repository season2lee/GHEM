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
  birth: string | null;
  gender: number | null;
};

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
