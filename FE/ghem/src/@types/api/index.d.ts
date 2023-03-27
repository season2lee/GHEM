declare module "apiTypes" {
  export type userInfoType = {
    user_id: number;
    nickname: string;
    gender: number;
    birth: string;
    introduce: string;
  };

  export type steamAccountType = {
    steamId: string;
    steamPassword: string;
  };

  export type contentInfoType = {
    app_id: number;
    user_id: number;
    content: string;
  };
}
