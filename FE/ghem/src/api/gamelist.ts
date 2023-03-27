import { instance as axios } from "./instance";
import { contentInfoType } from "apiTypes";

// GET

export const getEvaluatedGameList = async (userId: number) => {
  try {
    const { data } = await axios.get(`/review/my/${userId}`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const getInterestedGameList = async (userId: number) => {
  try {
    const { data } = await axios.get(`/dibs/my/${userId}`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// PUT

export const putUpdateGameContent = async (contentInfo: contentInfoType) => {
  try {
    const { data } = await axios.put(`/content/modify`, contentInfo);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
