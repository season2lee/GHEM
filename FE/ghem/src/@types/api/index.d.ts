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
    content: string;
    date: string;
    user_game_id: number;
    user_id: number;
  };

  export type modifiedContentInfoType = {
    app_id: number;
    user_id: number;
    content: string;
  };

  export type specInfoType = {
    cpu_com: string;
    cpu_series: string;
    gpu_com: string;
    gpu_name: string;
    os: string;
    ram: number;
    user_id?: number | null;
    spec_id?: number | null;
  };
}
