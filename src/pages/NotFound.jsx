import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import notFounc from "../assets/images/notFound.png";
import MiddleWideButton from "./../components/button/MiddleWideButton";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  function onClickMoveHome() {
    navigate("/");
  }

  return (
    <div css={wrapper}>
      <img src={notFounc} />
      <h1>원하시는 페이지를 찾을 수 없습니다.</h1>
      <div>
        <MiddleWideButton text={"홈으로 이동"} onclick={onClickMoveHome} />
      </div>
    </div>
  );
};

const wrapper = css`
  padding: 90px 200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    transform: translateX(20px);
    width: 700px;
    user-select: none;
  }

  & > div {
    margin-top: 40px;
    width: 300px;
  }
`;

export default NotFound;
