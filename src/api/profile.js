import { jsonInstance, formdataInstance } from "./instance";

const jsonAxios = jsonInstance();
const formDataAxios = formdataInstance();

async function getUserDetail(id) {
  try {
    const { data } = await jsonAxios.get(`/users/detail/${id}`);
    if (data.flag === "success") return data.data[0];
    else console.log("일치하는 유저 정보가 없습니다.");
  } catch (error) {
    console.log(error);
  }
}

async function getUserAsk(id) {
  try {
    const { data } = await jsonAxios.get(`/askboard/my/${id}`);
    if (data.flag === "success") return data.data;
    else console.log("일치하는 작성글 정보가 없습니다.");
  } catch (error) {
    console.log(error);
  }
}

async function getUserShare(id) {
  try {
    const { data } = await jsonAxios.get(`/shareboard/my/${id}`);
    if (data.flag === "success") return data.data[0];
    else console.log("일치하는 작성글 정보가 없습니다.");
  } catch (error) {
    console.log(error);
  }
}

async function putUserPasswordNickname(userId, nickName, password) {
  try {
    const { data } = await jsonAxios.put("/users/modify", { id: userId, nickName, password });
    if (data.flag === "success") {
      alert("프로필 정보가 변경되었습니다.");
    } else alert("프로필 변경에 실패했습니다. 다시 시도해주세요.");
  } catch (error) {
    console.log(error);
  }
}

async function putUserProfileImage(formData) {
  try {
    const { data } = await formDataAxios.put("/users/modify", formData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export { getUserDetail, getUserAsk, getUserShare, putUserPasswordNickname, putUserProfileImage };
