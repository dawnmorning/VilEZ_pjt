// Login 유효성 검사하는 함수
// input name을 인자로 받아서, 각 input의 유효성 검사 조건과 에러 문구를 설정

const LoginValidation = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "입력된 이메일이 유효하지 않습니다.";
  }

  if (!password) {
    errors.password = "비밀번호를 입력해주세요.";
  }

  return errors;
};

export default LoginValidation;
