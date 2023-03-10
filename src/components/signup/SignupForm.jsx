import React from "react";
import { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineExclamationCircle } from "react-icons/ai";
import LargeWideButton from "../../components/button/LargeWideButton";
import ConfirmButton from "./ConfirmButton";
import SignupInputBox from "./SignupInputBox";
import EmailCodeTimer from "./EmailCodeTimer";
import Validation from "./SignupValidation";
import useForm from "../../hooks/useForm";
import { SHA256 } from "./HashFunction";
import { postConfirmEmail } from "../../api/email";
import { getCheckNickName, postUserInformation } from "../../api/user";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [hashedCode, setHashedCode] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickName, setNickName] = useState("");
  const [nickNameCheck, setNickNameCheck] = useState("");
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);
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
  function onChangeNickName(event) {
    setNickName(event.target.value);
    errors.nickName = "";
    setNickNameCheck("");
    setIsNickNameAvailable(false);
  }
  function onSubmit() {
    const userInformation = {
      email,
      password: SHA256(password),
      nickName,
    };
    if (isNickNameAvailable && isCodeConfirmed) {
      postUserInformation(userInformation).then(() => {
        navigate("/login");
      });
    } else if (isCodeConfirmed) {
      alert("????????? ????????? ??????????????????????");
    }
  }
  function onSubmitEmail() {
    setIsCodeConfirmed(false);
    postConfirmEmail(email).then((response) => {
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
      setEmailConfirmText("????????? ????????? ?????????????????????. ??????????????? ?????? ??????????????????.");
    } else {
      setEmailConfirmText("?????? ????????? ???????????? ????????????. ???????????? ?????? ??????????????????.");
    }
  }
  function onSubmitNickName() {
    if (nickName.length > 0 && nickName.length < 7) {
      getCheckNickName(nickName).then((response) => {
        setNickNameCheck(response.text);
        setIsNickNameAvailable(response.isNickNameAvailable);
      });
    } else if (!nickName) {
      setNickNameCheck("???????????? ??????????????????.");
      setIsNickNameAvailable(false);
    } else if (nickName.length > 6) {
      setNickNameCheck("???????????? ?????? 6????????? ????????? ??? ?????????.");
      setIsNickNameAvailable(false);
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
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <div css={inputContainer}>
        <label css={loginLabelFont} htmlFor="email">
          ?????????
        </label>
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
                text="????????? ??????"
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
        {/* email ?????? ????????? */}
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
                  placeholder="?????? ????????? ??????????????????."
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
                <ConfirmButton text="??????" onClick={() => onSubmitEmailCode()} />
              </div>
            </div>
            {emailConfirmText && !isTimeOut ? (
              <small css={isCodeConfirmed ? confirmedWrapper : alertWrapper}>{emailConfirmText}</small>
            ) : null}
            {isTimeOut ? (
              <small css={alertWrapper}>?????? ????????? ?????????????????????. ????????? ????????? ?????? ????????????.</small>
            ) : null}
            <small css={redirectText}>
              ???????????? ?????? ?????????????{" "}
              <button
                onClick={() => {
                  onSubmitEmail();
                }}
              >
                ???????????? ?????????
              </button>
            </small>
            {/* {emailCode !== hashedCode ? (
              <small css={alertWrapper}>
                <small css={alert}>
                  <AiOutlineExclamationCircle size="14" />
                </small>
                <small
                  css={css`
                    line-height: 22px;
                  `}
                >
                  ?????? ????????? ???????????? ???????????? .?????? ??????????????????.
                </small>
              </small>
            ) : null} */}
          </div>
        ) : null}
        {/* email ?????? ???????????? */}
      </div>
      {/* email */}

      <div css={inputContainer}>
        <label css={loginLabelFont} htmlFor="password">
          ????????????
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
            placeholder="??????????????? ??????????????????."
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
              ?????? ?????????, ?????? ?????? 8~16????????? ??????????????????.
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
            placeholder="??????????????? ?????? ??? ??? ??????????????????."
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
                ? "??????????????? ???????????? ????????????. ?????? ??????????????????."
                : errors.password2}
            </small>
          </small>
        ) : null}
      </div>
      {/* password */}

      <div css={inputContainer}>
        <label css={loginLabelFont} htmlFor="email">
          ????????? ????????????
        </label>
        <div css={inputButtonWrapper}>
          <div
            css={css`
              width: calc(100% - 110px);
            `}
          >
            <SignupInputBox
              name="nickName"
              type="text"
              placeholder="???????????? ???????????????."
              onChange={(event) => {
                handleChange(event);
                onChangeNickName(event);
              }}
            />
          </div>
          <div
            css={css`
              width: 100px;
            `}
          >
            <ConfirmButton outline={true} text="????????????" onClick={() => onSubmitNickName()} />
          </div>
        </div>
        {errors.nickName && !nickNameCheck ? (
          <small css={alertWrapper}>
            <small css={alert}>
              <AiOutlineExclamationCircle size="14" />
            </small>
            <small
              css={css`
                line-height: 22px;
              `}
            >
              {errors.nickName}
            </small>
          </small>
        ) : null}
        {!errors.nickName && nickNameCheck ? <small css={alertNickNameWrapper}>{nickNameCheck}</small> : null}
      </div>
      <br />
      <LargeWideButton text="????????????" />
    </form>
  );
};

const loginLabelFont = css`
  display: block;
  font-size: 18px;
  font-weight: Bold;
  margin-bottom: 10px;
`;
const inputContainer = css`
  padding-top: 20px;
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
const alertNickNameWrapper = css`
  display: flex;
  align-items: center;
  padding-top: 3px;
  height: 21px;
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

export default SignupForm;
