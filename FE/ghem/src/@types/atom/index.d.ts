declare module "atomTypes" {
  export type userInfoStateType = {
    user_id: number;
    nickname: string | null;
    steamId: string | null;
    introduce: string | null;
    userProfile: string | null;
    birth: string | null;
    gender: number | null;
  };

  export type reviewInfoType = {
    app_id: number;
    user_game_id: number;
    title: string;
    rating: number;
    review: string | undefined;
  };
}
