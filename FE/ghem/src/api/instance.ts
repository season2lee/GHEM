import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// interceptor

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["access-token"] = `${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // 액세스 토큰이 만료됐으면 다시 로그인 진행
      window.localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { instance };
