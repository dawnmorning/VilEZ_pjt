// Login 유효성 검사하는 함수
// input name을 인자로 받아서, 각 input의 유효성 검사 조건과 에러 문구를 설정

const IndividualValidation = (value) => {
  const error = {};

  if (Object.keys(value).includes("email")) {
    if (!value.email) {
      error.email = "이메일을 입력해주세요.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      error.email = "올바른 이메일 형식이 아닙니다. 다시 입력해주세요.";
    }
  }

  if (Object.keys(value).includes("emailCode")) {
    if (!value.emailCode) {
      error.emailCode = "이메일로 전송된 인증 코드를 입력해주세요.";
    }
  }

  if (Object.keys(value).includes("nickName")) {
    if (!value.nickName) {
      error.nickName = "닉네임을 입력해주세요.";
    } else if (value.nickName.length > 6) {
      error.nickName = "최대 6자까지 설정할 수 있어요.";
    }
  }

  return error;
};

export default IndividualValidation;
