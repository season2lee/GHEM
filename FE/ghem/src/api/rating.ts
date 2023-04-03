import { instance as axios } from "./instance";
import { ratingInfoType } from "apiTypes";

// GET

export const getRatingGameList = async (userId: number) => {
  try {
    const { data } = await axios.get(`/rating/${userId}`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// POST

export const postGameRating = async (ratingInfo: ratingInfoType) => {
  try {
    const { data } = await axios.post(`/rating`, ratingInfo);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// PUT

export const putGameRating = async (ratingInfo: ratingInfoType) => {
  try {
    const { data } = await axios.put(`/rating`, ratingInfo);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// DELETE

export const deleteGameRating = async (ratingInfo: ratingInfoType) => {
  try {
    const { data } = await axios.delete(
      `/rating?app_id=${ratingInfo.app_id}&rating=${ratingInfo.rating}&user_id=${ratingInfo.user_id}`
    );

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
