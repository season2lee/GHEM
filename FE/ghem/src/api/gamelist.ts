import { instance as axios } from "./instance";
import { contentInfoType, modifiedContentInfoType } from "apiTypes";

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

// POST

export const postGameContent = async (contentInfo: contentInfoType) => {
  try {
    const { data } = await axios.post(`/content`, contentInfo);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// PUT

export const putUpdateGameContent = async (contentInfo: modifiedContentInfoType) => {
  try {
    const { data } = await axios.put(`/content/modify`, contentInfo);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// DELETE

export const deleteEvaluatedGame = async (id: number) => {
  try {
    const { data } = await axios.delete(`/review/delete/${id}`);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
