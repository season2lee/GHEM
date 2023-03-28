import { instance as axios } from "./instance";
import { specInfoType } from "apiTypes";

// GET

export const getMyComputerSpec = async (userId: number) => {
  try {
    const { data } = await axios.get(`/specs/my/${userId}`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// POST

export const postMyComputerSpec = async (specInfo: specInfoType) => {
  try {
    const { data } = await axios.post(`/specs/modify`, specInfo);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

// PUT

export const putMyComputerSpec = async (specInfo: specInfoType) => {
  try {
    const { data } = await axios.put(`/specs/modify`, specInfo);

    if (data.flag) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
