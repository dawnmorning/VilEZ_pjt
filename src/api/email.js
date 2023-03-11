import { defaultAxios } from "./instance";

// POST

async function postConfirmEmail(email) {
  try {
    const { data } = await defaultAxios.post("/emailConfirm", { email: email });

    if (data.flag === "success") {
      alert("이메일 전송에 성공했어요! 메일함에서 인증 번호를 확인해주세요.");
      return data.data;
    } else if (data.flag === "duplicated") {
      alert("이미 계정이 존재하는 이메일이에요. 다른 이메일을 입력해주시겠어요?");
    } else {
      alert("이메일 전송에 실패했어요. 이메일 주소를 다시 확인해주시겠어요?");
    }
  } catch (error) {
    console.log(error);
  }
}

async function postConfirmEmailForPassword(email) {
  try {
    const { data } = await defaultAxios.post("/passowrd", { email: email });

    if (data.flag === "success") {
      alert("이메일 전송에 성공했어요. 메일함에서 인증 번호를 확인해주시겠어요?");
      return data.data;
    } else if (data.flag === "Not_Exist") {
      alert("해당 이메일로 계정이 존재하지 않네요. 이메일 주소를 다시 확인해주시겠어요?");
    } else {
      alert("이메일 전송에 실패했어요. 이메일 주소를 다시 확인해주시겠어요?");
    }
  } catch (error) {
    console.log(error);
  }
}

export { postConfirmEmail, postConfirmEmailForPassword };
