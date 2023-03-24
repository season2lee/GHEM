import { instance as axios } from "./instance";

// GET

export const getUserProfile = async (userId: number) => {
  try {
    const { data } = await axios.get(`/${userId}`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// PUT

export type userInfoType = {
  user_id: number;
  nickname: string;
  gender: number;
  birth: string;
  introduce: string;
};

export const putUserProfile = async (userInfo: userInfoType) => {
  try {
    const { data } = await axios.put("/", userInfo);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export type steamAccountType = {
  steamId: string;
  steamPassword: string;
};

export const putUserSteamAccount = async (steamAccount: steamAccountType) => {
  try {
    const { data } = await axios.put("/steam", steamAccount);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
