import { atom } from "recoil";

export type MainHoverType = {
  colId: number;
  appid: number;
  isEnter: boolean;
};

// hover 했을 때 메인 창의 게임 리스트 움직임 멈추기 위한 상태관리
export const mainHover = atom<MainHoverType>({
  key: "hoverID",
  default: {
    colId: 0,
    appid: 0,
    isEnter: false,
  },
});
