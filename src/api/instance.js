import axios from "axios";
import { postRefreshToken } from "./user";

/**
 * 인증이 필요없는 기본 요청
 * @returns axios instance
 */
function defaultInstance() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return instance;
}

/**
 * 인증이 필요한 요청 중 json 타입의 요청
 * @returns axios instance
 */
function authJsonInstance() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return instance;
}

/**
 * 인증이 필요한 요청 중 form-data 타입의 요청
 * @returns axios instance
 */
function authFormDataInstance() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return instance;
}

export const defaultAxios = defaultInstance();
export const authJsonAxios = authJsonInstance();
export const authFormDataAxios = authFormDataInstance();

/** 인터셉터 처리 */

// axios 요청이 처리되기 전 요청 가로채기
authJsonAxios.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("accessToken");

    if (!accessToken) {
      return;
    } else {
      config.headers["access-token"] = `${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// axios 요청이 처리되기 전 응답 가로채기
authJsonAxios.interceptors.response.use(
  (response) => response, // 응답이 성공적인 경우 아무것도 하지 않음
  async (error) => {
    // 액세스 토큰이 만료됐다면
    if (error.response.status === 401) {
      const response = await postRefreshToken(); // 액세스토큰 갱신

      // 갱신된 accessToken을 받으면
      if (response) {
        window.localStorage.setItem("accessToken", response.accessToken); // 새로운 토큰 localStorage 저장
        window.localStorage.setItem("refreshToken", response.refreshToken);
        error.config.headers["access-token"] = response; // 원래 api 요청의 headers의 accessToken도 변경
        const originalResponse = await authJsonAxios.request(error.config); // 원래 api 요청하기
        return originalResponse; // 원래 api 요청의 response return
      }
      // 리프레시 토큰도 만료됐으면
      else {
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");
        window.localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// axios 요청이 처리되기 전 요청 가로채기
authFormDataAxios.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("accessToken");

    if (!accessToken) {
      return;
    } else {
      config.headers["access-token"] = `${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// axios 요청이 처리되기 전 응답 가로채기
authFormDataAxios.interceptors.response.use(
  (response) => response, // 응답이 성공적인 경우 아무것도 하지 않음
  async (error) => {
    // 액세스 토큰이 만료됐다면
    if (error.response.status === 401) {
      const response = await postRefreshToken(); // 액세스토큰 갱신

      // 갱신된 accessToken을 받으면
      if (response) {
        window.localStorage.setItem("accessToken", response.accessToken); // 새로운 토큰 localStorage 저장
        window.localStorage.setItem("refreshToken", response.refreshToken);
        error.config.headers["access-token"] = response; // 원래 api 요청의 headers의 accessToken도 변경
        const originalResponse = await authFormDataInstance.request(error.config); // 원래 api 요청하기
        return originalResponse; // 원래 api 요청의 response return
      }
      // 리프레시 토큰도 만료됐으면
      else {
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");
        window.localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
