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
}
