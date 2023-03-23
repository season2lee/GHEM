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

type userInfoType = {
  user_id: number;
  nickname: string;
  introduce: string;
};

export const putUserProfile = async (userInfo: userInfoType) => {
  try {
    const { data } = await axios.put("/", userInfo);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
