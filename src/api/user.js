import { authJsonAxios, authFormDataAxios, defaultAxios } from "./instance";

// GET

async function getUserDetail(userId) {
  try {
    const { data } = await authJsonAxios.get(`/users/detail/${userId}`);

    if (data.flag === "success") return data.data[0];
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getCheckNickName(nickName) {
  try {
    const { data } = await defaultAxios.get(`/users/check?nickname=${nickName}`);

    if (data.flag === "success") {
      return { text: `"${nickName}"은(는) 사용 가능한 닉네임입니다.`, isNickNameAvailable: true };
    } else if (data.flag === "fail") {
      return {
        text: `"${nickName}"은(는) 사용중인 닉네임입니다. 다른 닉네임을 입력해 주세요.`,
        isNickNameAvailable: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCheckValidToken() {
  // 로그인 유지를 위한 토큰 유효 검사
  try {
    const { data } = await authJsonAxios.get(`/users/check/access`);

    if (data.flag === "success") return data.data[0];
    else return false;
  } catch (error) {
    console.log(error);
  }
}

// POST

async function postMannerPoint(body) {
  try {
    const { data } = await authJsonAxios.post(`/users/manner`, body);

    if (data.flag === "success") return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function postLogin(email, password) {
  try {
    const { data } = await defaultAxios.post(`/users/login`, { email, password });

    if (data.flag === "success") {
      if (!data.data) {
        alert("이메일 혹은 비밀번호가 일치하지 않네요. 다시 확인해주시겠어요?");
      } else {
        return data.data[0];
      }
    } else {
      alert("이메일 혹은 비밀번호가 일치하지 않네요. 다시 확인해주시겠어요?");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function postLogout(id) {
  try {
    const { data } = await defaultAxios.post("users/logout", { id: id });

    if (data.flag === "success") return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function postRefreshToken() {
  try {
    // 리프레쉬 토큰을 이용해 액세스 토큰을 갱신
    const refreshToken = window.localStorage.getItem("refreshToken");
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "refresh-token": refreshToken,
    };

    const { data } = await defaultAxios.post(
      `/users/refresh`,
      {},
      {
        headers: headers,
      }
    );

    if (data.flag === "success") {
      return data.data[0];
    } else if (data.flag === "fail") {
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function postUserInformation(userInformation) {
  try {
    const { data } = await defaultAxios.post("/users/join", userInformation);

    if (data.flag === "success") {
      alert("회원가입이 완료되었어요. 로그인을 진행해주시면 돼요.");
      return data.data;
    } else if (data.flag === "fail") {
      alert("회원가입이 정상적으로 완료되지 않았어요. 다시 진행해주시겠어요?");
      return "";
    }
  } catch (error) {
    console.log(error);
  }
}

// PUT

async function putUserPasswordByEmail(email, password) {
  try {
    const { data } = await defaultAxios.put(`/users/modify/password?email=${email}&password=${password}`);
    if (data.flag === "success") {
      alert("비밀번호가 성공적으로 변경되었어요. 로그인을 진행해주시면 돼요.");
      return data;
    } else alert("비밀번호가 변경에 실패했어요. 다시 시도해주시겠어요?");
  } catch (error) {
    console.log(error);
  }
}

async function putUserPasswordNickName(userId, nickName, password) {
  try {
    const { data } = await authJsonAxios.put("/users/modify", { id: userId, nickName: nickName, password: password });
    if (data.flag === "success") {
      return data;
    } else alert("프로필 변경에 실패했어요. 다시 시도해주시겠어요?");
  } catch (error) {
    console.log(error);
  }
}

async function putUserProfileImage(formData) {
  try {
    const { data } = await authFormDataAxios.put("/users/profile", formData);

    if (data.flag === "success") return data.data;
    else alert("프로필 변경에 실패했어요. 다시 시도해주시겠어요?");
  } catch (error) {
    console.log(error);
  }
}

export {
  getUserDetail,
  getCheckNickName,
  getCheckValidToken,
  postMannerPoint,
  putUserPasswordByEmail,
  putUserPasswordNickName,
  putUserProfileImage,
  postLogin,
  postLogout,
  postRefreshToken,
  postUserInformation,
};
