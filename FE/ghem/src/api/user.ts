import { instance as axios } from "./instance";
import { userInfoType, steamAccountType } from "apiTypes";

// GET

export const getUserID = () => {
  const localID = localStorage.getItem("id");
  if (localID && !isNaN(parseInt(localID))) {
    return parseInt(localID);
  } else {
    return null
  }
}

export const getUserProfileURL = async (userId: number) => {
  try {
    const { data } = await axios.get(`/${userId}`);
    const user = data.data.user;
    const url = user.userProfile.substr(1, user.userProfile.length - 2);
    return url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserProfile = async (userId: number) => {
  try {
    const { data } = await axios.get(`/${userId}`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const getNicknameCheck = async (nickname: string) => {
  try {
    const { data } = await axios.get(`/nickname/${nickname}`);

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
