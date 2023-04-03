import { instance as axios } from "./instance";
import { reviewInfoType } from "apiTypes";

// GET

export const getGameReviewList = async (appId: number) => {
  try {
    const { data } = await axios.get(`/review/${appId}`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// PUT

export const putGameReview = async (reviewInfo: reviewInfoType) => {
  try {
    const { data } = await axios.put(`/review`, reviewInfo);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
