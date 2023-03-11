import { defaultAxios } from "./instance";

async function requestKakaoLogin(code) {
  try {
    const { data } = await defaultAxios.get(`/oauth2/code/kakao?code=${code}`);

    if (data.flag === "oauth_join_success & login_success" || data.flag === "login_success") {
      return data.data;
    } else {
      alert("로그인이 정상적으로 완료되지 않았습니다. 다시 시도해주시겠어요?");
    }
  } catch (error) {
    console.log(error);
  }
}

async function requestNaverLogin(code) {
  try {
    const { data } = await defaultAxios.get(`/oauth2/code/naver?code=${code}`);

    if (data.flag === "oauth_join_success & login_success" || data.flag === "login_success") {
      return data.data;
    } else {
      alert("로그인이 정상적으로 완료되지 않았습니다. 다시 시도해주시겠어요?");
    }
  } catch (error) {
    console.log(error);
  }
}

export { requestKakaoLogin, requestNaverLogin };
