import React from "react";
import { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineExclamationCircle } from "react-icons/ai";
import LargeWideButton from "../button/LargeWideButton";
import ConfirmButton from "./ConfirmButton";
import SignupInputBox from "./SignupInputBox";
import EmailCodeTimer from "./EmailCodeTimer";
import Validation from "./PasswordValidation";
import useForm from "../../hooks/useForm";
import { SHA256 } from "./HashFunction";
import { postConfirmEmailForPassword } from "../../api/email";
import { putUserPasswordByEmail } from "../../api/user";
import { Link, useNavigate } from "react-router-dom";

const FindPassword = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [hashedCode, setHashedCode] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isEmailCodeVisible, setIsEmailCodeVisible] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [emailConfirmText, setEmailConfirmText] = useState("");
  function onChangeEmail(event) {
    setEmail(event.target.value);
    setIsEmailCodeVisible(false);
  }
  function onChangeEmailCode(event) {
    setEmailCode(event.target.value);
  }
  function onChangePassword(event) {
    setPassword(event.target.value);
    errors.password = "";
  }
  function onChangePassword2(event) {
    setPassword2(event.target.value);
    errors.password2 = "";
  }
  function onSubmit() {
    if (isCodeConfirmed) {
      putUserPasswordByEmail(email, SHA256(password)).then((response) => {
        if (response) {
          navigate("/login");
        }
      });
    }
  }
  function onSubmitEmail() {
    setIsCodeConfirmed(false);
    setEmailConfirmText("");
    postConfirmEmailForPassword(email).then((response) => {
      if (response) {
        setHashedCode(response[0]);
        setIsEmailCodeVisible(false);
        setTimeout(() => {
          setIsEmailCodeVisible(true);
        }, 100);
        setIsTimeOut(false);
      }
    });
  }
  function onSubmitEmailCode() {
    if (SHA256(emailCode) === hashedCode) {
      setIsCodeConfirmed(true);
      setEmailConfirmText("이메일 인증이 완료되었습니다.");
    } else {
      setEmailConfirmText("인증 코드가 일치하지 않습니다. 이메일을 다시 확인해주세요.");
    }
  }
  const onClickVisible = (event) => {
    event.preventDefault();
    setIsVisible((prev) => !prev);
  };

  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      password: "",
      password2: "",
      email: "",
      nickName: "",
      emailCode: "",
    },
    onSubmit: onSubmit,
    Validation,
  });
  return (
    <div
      css={css`
        padding: 90px 200px;
      `}
    >
      <h2
        css={css`
          text-align: center;
        `}
      >
        비밀번호 재설정
      </h2>
      <br />
      <div css={formContainer}>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
          css={isCodeConfirmed ? moveLeft : null}
        >
          <div css={[inputContainer, isCodeConfirmed ? fadeOut : null]}>
            <label css={loginLabelFont} htmlFor="email">
              이메일 인증
            </label>
            <small css={caption}>비밀번호 재설정을 위해 이메일 인증을 완료해주세요.</small>
            <div>
              <div css={inputButtonWrapper}>
                <div
                  css={css`
                    width: calc(100% - 130px);
                  `}
                >
                  <SignupInputBox
                    name="email"
                    type="text"
                    placeholder="vilez@villypeople.com"
                    disabled={isCodeConfirmed}
                    onChange={(event) => {
                      handleChange(event);
                      onChangeEmail(event);
                    }}
                  />
                </div>
                <div
                  css={css`
                    width: 120px;
                  `}
                >
                  <ConfirmButton
                    outline={true}
                    text="이메일 인증"
                    onClick={() => {
                      onSubmitEmail();
                    }}
                  />
                </div>
              </div>
              {errors.email ? (
                <small css={alertWrapper}>
                  <small css={alert}>
                    <AiOutlineExclamationCircle size="14" />
                  </small>
                  <small
                    css={css`
                      line-height: 22px;
                    `}
                  >
                    {errors.email}
                  </small>
                </small>
              ) : null}
            </div>
            {/* email 인증 보내기 */}
            {isEmailCodeVisible ? (
              <div css={emailCodeWrapper}>
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                  `}
                >
                  <div css={codeAndTimer}>
                    <SignupInputBox
                      name="emailCode"
                      type="text"
                      placeholder="인증 코드를 입력해주세요."
                      onChange={(event) => {
                        handleChange(event);
                        onChangeEmailCode(event);
                      }}
                      disabled={isCodeConfirmed}
                    />
                    {!isCodeConfirmed ? (
                      <EmailCodeTimer
                        setIsTimeOut={setIsTimeOut}
                        setEmailConfirmText={() => {
                          setEmailConfirmText();
                        }}
                        setHashedCode={() => {
                          setHashedCode();
                        }}
                      />
                    ) : null}
                  </div>
                  <div
                    css={css`
                      width: 80px;
                    `}
                  >
                    <ConfirmButton text="확인" onClick={() => onSubmitEmailCode()} />
                  </div>
                </div>
                {emailConfirmText && !isTimeOut ? (
                  <small css={isCodeConfirmed ? confirmedWrapper : alertWrapper}>{emailConfirmText}</small>
                ) : null}
                {isTimeOut ? (
                  <small css={alertWrapper}>인증 시간이 초과되었습니다. 이메일 인증을 다시 해주세요.</small>
                ) : null}
                {isCodeConfirmed ? null : (
                  <small css={redirectText}>
                    이메일을 받지 못했나요?
                    <button
                      onClick={() => {
                        onSubmitEmail();
                      }}
                    >
                      인증코드 재요청
                    </button>
                  </small>
                )}
              </div>
            ) : null}
            {/* email 인증 확인하기 */}
          </div>
          {/* email */}

          {isCodeConfirmed ? (
            <div css={inputContainer}>
              <label css={loginLabelFont} htmlFor="password">
                비밀번호 재설정
              </label>
              <div
                css={css`
                  position: relative;
                  padding-bottom: 6px;
                `}
              >
                <SignupInputBox
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요."
                  onChange={(event) => {
                    handleChange(event);
                    onChangePassword(event);
                  }}
                />
                {errors.password ? null : (
                  <small
                    css={css`
                      color: #8a8a8a;
                    `}
                  >
                    영어 소문자, 숫자 조합 8~16자리로 입력해주세요.
                  </small>
                )}
                {errors.password ? (
                  <small css={alertWrapper}>
                    <small css={alert}>
                      <AiOutlineExclamationCircle size="14" />
                    </small>
                    <small
                      css={css`
                        line-height: 22px;
                      `}
                    >
                      {errors.password}
                    </small>
                  </small>
                ) : null}
              </div>
              <div
                css={css`
                  position: relative;
                `}
              >
                <SignupInputBox
                  name="password2"
                  type={isVisible ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  onChange={(event) => {
                    handleChange(event);
                    onChangePassword2(event);
                  }}
                />
                <span onClick={onClickVisible} css={isVisibleButton}>
                  {isVisible ? (
                    <AiOutlineEye size="28" color="#66dd9c" />
                  ) : (
                    <AiOutlineEyeInvisible size="28" color="#66dd9c" />
                  )}
                </span>
              </div>
              {errors.password2 || (password !== password2 && password2) ? (
                <small css={alertWrapper}>
                  <small css={alert}>
                    <AiOutlineExclamationCircle size="14" />
                  </small>
                  <small
                    css={css`
                      line-height: 22px;
                    `}
                  >
                    {password !== password2 && password2
                      ? "비밀번호가 일치하지 않습니다. 다시 입력해주세요."
                      : errors.password2}
                  </small>
                  <br />
                </small>
              ) : null}
              <div
                css={css`
                  padding-top: 20px;
                `}
              >
                <LargeWideButton text="비밀번호 재설정 완료" onclick={onSubmit} />
              </div>
            </div>
          ) : null}
          {/* password */}
        </form>
        <div css={linkWrapper}>
          <Link to={"/login"} css={linkTag}>
            <p>돌아가기</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
const formContainer = css`
  overflow: hidden;
  & > form {
    display: flex;
    width: 200%;
  }
`;
const moveLeft = css`
  transition: all 0.3s;
  transition-delay: 1s;
  transform: translateX(-50%);
`;
const fadeOut = css`
  transition: all 0.3s;
  transition-delay: 0.8s;
  opacity: 0;
`;
const loginLabelFont = css`
  display: block;
  font-size: 18px;
  font-weight: Bold;
  margin-bottom: 10px;
`;
const caption = css`
  display: block;
  color: #c4c4c4;
  padding-bottom: 10px;
`;
const inputContainer = css`
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: calc(25% - 210px);
  padding-right: calc(25% - 210px);
  width: 50%;
`;
const inputButtonWrapper = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: start;
`;
const isVisibleButton = css`
  position: absolute;
  right: 24px;
  top: calc(55px / 2 - 14px);
  cursor: pointer;
  border: none;
  background-color: rgba(0, 0, 0, 0);
`;
const codeAndTimer = css`
  width: calc(100% - 90px);
  position: relative;
  & > div {
    position: absolute;
    height: 55px;
    line-height: 55px;
    top: 0px;
    right: 14px;
  }
`;
const redirectText = css`
  display: block;
  padding-top: 4px;
  & > button {
    cursor: pointer;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    margin-left: 10px;
    font-weight: bold;
    :hover {
      text-decoration: underline;
    }
  }
`;
const alertWrapper = css`
  color: red;
  display: flex;
  align-items: center;
  padding-top: 3px;
  height: 24px;
`;

const confirmedWrapper = css`
  color: #000;
  display: flex;
  align-items: center;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin-top: 14px;
  background-color: #fff;
  border-radius: 5px;
`;
const alert = css`
  margin-right: 3px;
  display: flex;
  align-items: center;
  height: 21px;
`;
const emailCodeWrapper = css`
  display: block;
  margin-top: 16px;
  border-radius: 5px;
  background-color: #acf0cb;
  padding: 20px 20px 14px;
  visibility: isVisible;
  opacity: 1;
  transition: all 0.5s;
`;
const linkWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  :hover {
    text-decoration: underline;
  }
`;
const linkTag = css`
  width: 140px;
  text-align: center;
`;
export default FindPassword;
