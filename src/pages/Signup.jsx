import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import DivideLine from "../components/common/DivideLine";
// import SignupForm from "../components/signup/SignupForm";
import SignupForm from "../components/signup/SignupForm";

const Signup = () => {
  return (
    <div css={container}>
      <div css={signupContainer}>
        <div css={[titleFont, signupTitle]}>빌리지 주민 신청서</div>
        <DivideLine />
        <div css={signupFormContainer}>
          <SignupForm />
        </div>
        <div css={linkWrapper}>
          이미 계정이 있으신가요?
          <Link to={"/login"} css={linkTag}>
            <p>로그인</p>
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
const signupContainer = css`
  width: 670px;
  margin: 0 auto;
`;
const signupTitle = css`
  text-align: center;
  padding-bottom: 30px;
`;
const signupFormContainer = css`
  width: 460px;
  padding: 30px 0 40px;
  margin: 0 auto;
`;
const linkWrapper = css`
  display: flex;
  justify-content: center;
`;
const linkTag = css`
  width: 80px;
  text-align: center;
`;
export default Signup;
