import axios, { AxiosRequestConfig } from "axios";



export const request = axios.create({
  baseURL: "http://j8d107.p.ssafy.io:32001",
});

const delay = 500; // 0.5초
let cancel: (() => void) | undefined;

request.interceptors.request.use(
  (config:AxiosRequestConfig) => {
    // 이전 요청 취소
    if (cancel) {
      cancel();
    }

    // 새로운 요청 취소 설정
    config.cancelToken = new axios.CancelToken((c) => {
      cancel = c;
    });

    // 요청 지연
    return new Promise<AxiosRequestConfig>((resolve) =>
      setTimeout(() => resolve(config), delay)
    );
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    // 응답이 성공하면, 취소 토큰 초기화
    cancel = undefined;
    return response;
  },
  (error) => {
    // 에러가 발생하면, 취소 토큰 초기화
    cancel = undefined;
    return Promise.reject(error);
  }
);
