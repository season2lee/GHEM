import { instance as axios } from "./instance";

// GET

const getRequestKakaoLogin = async (code: string) => {
  try {
    const { data } = await axios.get(`/oauth2/code/kakao?code=${code}`);
    console.log("data : ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getRequestNaverLogin = async (code: string) => {
  try {
    const { data } = await axios.get(`/oauth2/code/naver?code=${code}`);
    console.log("data : ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getRequestKakaoLogin, getRequestNaverLogin };
