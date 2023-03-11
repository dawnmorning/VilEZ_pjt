import React from "react";
import { css } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import DivideLine from "../components/common/DivideLine";
import OAuthLoginButton from "../components/login/OAuthLoginButton";
import LoginForm from "../components/login/LoginForm";
import Kakao from "../assets/images/social_kakao.png";
import Naver from "../assets/images/social_naver.png";

const Login = () => {
  const navigate = useNavigate();

  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const NAVER_REST_API_KEY = process.env.REACT_APP_NAVER_REST_API_KEY;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&state=randomtext&redirect_uri=${NAVER_REDIRECT_URI}`;

  const onClickKakao = () => {
    navigate(KAKAO_AUTH_URL);
  };
  const onClickNaver = () => {
    navigate(NAVER_AUTH_URL);
  };
  return (
    <div css={container}>
      <div css={loginContainer}>
        <div css={[titleFont, loginTitle]}>빌리지 입장하기</div>
        <DivideLine />
        <div css={loginFormContainer}>
          <LoginForm />
        </div>
        <div css={flexBox}>
          <DivideLine width="300px" />
          <div css={loginLabelFont}>또는</div>
          <DivideLine width="300px" />
        </div>
        <div css={loginFormContainer}>
          <a href={KAKAO_AUTH_URL}>
            <OAuthLoginButton
              text="카카오로 로그인"
              onClick={onClickKakao}
              src={Kakao}
              alt="카카오"
              backgroundColor="#FEE502"
              color="#000"
            />
          </a>
          <a href={NAVER_AUTH_URL}>
            <OAuthLoginButton
              text="네이버로 로그인"
              onClick={onClickNaver}
              src={Naver}
              alt="네이버"
              backgroundColor="#24CD0B"
              color="#FFF"
            />
          </a>
        </div>
        <div css={linkWrapper}>
          <Link to={"/signup"} css={linkTag}>
            <p>회원가입하기</p>
          </Link>
          |
          <Link to={"/password"} css={linkTag}>
            <p>비밀번호 재설정</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
const container = css`
  padding: 160px 200px 90px;
  display: flex;
  flex-direction: column;
`;
const titleFont = css`
  font-size: 30px;
  font-weight: Bold;
`;
const loginContainer = css`
  max-width: 670px;
  margin: 0 auto;
`;
const loginTitle = css`
  text-align: center;
  padding-bottom: 30px;
`;
const loginFormContainer = css`
  width: 420px;
  padding: 30px 0 40px;
  margin: 0 auto;
`;
const loginLabelFont = css`
  display: block;
  width: 50px;
  text-align: center;
  font-size: 18px;
  font-weight: Bold;
  margin-bottom: 10px;
`;
const flexBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const linkWrapper = css`
  display: flex;
  justify-content: center;
`;
const linkTag = css`
  width: 140px;
  text-align: center;
  color: black;
`;
export default Login;
