import { instance as axios } from "./instance";
import { userInfoType, steamAccountType } from "apiTypes";

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

export const putUserProfile = async (userInfo: userInfoType) => {
  try {
    const { data } = await axios.put("/", userInfo);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
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
