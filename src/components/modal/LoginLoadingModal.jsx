import React from "react";
/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

const LoginLoadingModal = () => {
  return (
    <div css={modalWrapper}>
      <div>
        <span>V</span>
        <span>i</span>
        <span>l</span>
        <span>E</span>
        <span>Z</span>
      </div>
      <div>로그인 중입니다.</div>
    </div>
  );
};

const loadingImage = keyframes`
  0% {
  transform: translateY(0px);
  opacity: 1;
  }
  70% {
  transform: translateY(0px);
  opacity: 1;
  }
  100% {
  transform: translateY(-10px);
  opacity: 0.8;
  }
`;

const modalWrapper = css`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    color: #66dd9c;

    & > span {
      font-size: 36px;
      font-weight: bold;
    }

    & > span:nth-of-type(1) {
      animation-duration: 0.6s;
      animation-name: ${loadingImage};
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }

    & > span:nth-of-type(2) {
      animation-duration: 0.6s;
      animation-delay: 0.1s;
      animation-name: ${loadingImage};
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }

    & > span:nth-of-type(3) {
      animation-duration: 0.6s;
      animation-delay: 0.2s;
      animation-name: ${loadingImage};
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }

    & > span:nth-of-type(4) {
      animation-duration: 0.6s;
      animation-delay: 0.3s;
      animation-name: ${loadingImage};
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }

    & > span:nth-of-type(5) {
      animation-duration: 0.6s;
      animation-delay: 0.4s;
      animation-name: ${loadingImage};
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
  }

  > div:nth-of-type(2) {
    padding-top: 20px;
  }
`;

export default LoginLoadingModal;
