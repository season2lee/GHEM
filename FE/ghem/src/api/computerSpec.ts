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

export const getCpuBrand = async () => {
  try {
    const { data } = await axios.get(`/specs/cpu/brand`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const getGpuBrand = async () => {
  try {
    const { data } = await axios.get(`/specs/gpu/brand`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const getCpuModel = async (brand: string, input: string) => {
  try {
    const { data } = await axios.get(`/specs/cpu/${brand}/${input}`);

    if (data.flag) return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const getGpuModel = async (brand: string, input: string) => {
  try {
    const { data } = await axios.get(`/specs/gpu/${brand}/${input}`);

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
