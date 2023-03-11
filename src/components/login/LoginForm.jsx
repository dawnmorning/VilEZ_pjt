import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineExclamationCircle } from "react-icons/ai";
import LargeWideButton from "../../components/button/LargeWideButton";
import LoginInputBox from "./LoginInputBox";
import Validation from "../../components/login/LoginValidation";
import useForm from "../../hooks/useForm";
import { postLogin } from "../../api/user";
import { useSetRecoilState } from "recoil";
import { loginUserState, isLoginState } from "../../recoil/atom";
import { SHA256 } from "../signup/HashFunction";

const LoginForm = () => {
  const navigate = useNavigate();
  const setLoginUser = useSetRecoilState(loginUserState);
  const setIsLogin = useSetRecoilState(isLoginState);

  const [visible, setVisible] = useState(false);

  // 로그인
  const onSubmit = (values) => {
    postLogin(values.email, SHA256(values.password)).then((res) => {
      if (!res) return;

      // localstorage와 login에 유저 정보 저장
      window.localStorage.setItem("accessToken", res.accessToken);
      window.localStorage.setItem("refreshToken", res.refreshToken);
      window.localStorage.setItem("id", res.id);
      window.localStorage.setItem("nickName", res.nickName);
      window.localStorage.setItem("profileImg", res.profileImg);
      window.localStorage.setItem("areaLat", res.areaLat);
      window.localStorage.setItem("areaLng", res.areaLng);
      window.localStorage.setItem("oauth", res.oauth);

      setLoginUser({
        id: res.id,
        nickName: res.nickName,
        manner: res.manner,
        point: res.point,
        profileImg: res.profileImg,
        areaLng: res.areaLng,
        areaLat: res.areaLat,
      });

      setIsLogin(true);

      navigate("/");
    });
  };

  const onClickVisible = (event) => {
    event.preventDefault();
    setVisible((prev) => !prev);
  };

  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit,
    Validation,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div css={inputContainer}>
        <label css={loginLabelFont} htmlFor="email">
          이메일
        </label>
        <LoginInputBox name="email" type="text" placeholder="vilez@villypeople.com" onChange={handleChange} />
        <small css={alertWrapper}>
          <small css={alert}>{errors.email ? <AiOutlineExclamationCircle size="14" /> : null}</small>
          <small
            css={css`
              line-height: 22px;
            `}
          >
            {errors.email ? errors.email : null}
          </small>
        </small>
      </div>
      <div>
        <label css={loginLabelFont} htmlFor="password">
          비밀번호
        </label>
        <div
          css={css`
            position: relative;
          `}
        >
          <LoginInputBox
            name="password"
            type={visible ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요."
            onChange={handleChange}
          />
          <span onClick={onClickVisible} css={visibleButton}>
            {visible ? <AiOutlineEye size="28" color="#66dd9c" /> : <AiOutlineEyeInvisible size="28" color="#66dd9c" />}
          </span>
        </div>
        <small css={alertWrapper}>
          <small css={alert}>{errors.password ? <AiOutlineExclamationCircle size="14" /> : null}</small>
          <small
            css={css`
              line-height: 22px;
            `}
          >
            {errors.password ? errors.password : null}
          </small>
        </small>
      </div>
      <LargeWideButton text="입장하기" />
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
  margin-bottom: 14px;
`;

const visibleButton = css`
  position: absolute;
  right: 24px;
  top: calc(55px / 2 - 14px);
  cursor: pointer;
  border: none;
  background-color: rgba(0, 0, 0, 0);
`;

const alertWrapper = css`
  color: red;
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

export default LoginForm;
