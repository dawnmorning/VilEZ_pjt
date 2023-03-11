import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

const QrCodeTimer = (props) => {
  // 타이머를 초단위로 변환한 initialTime과 setInterval을 저장할 interval ref
  const initialTime = useRef(30);
  const interval = useRef(null);
  const [sec, setSec] = useState(padNumber(0, 2));
  function onClickReset() {
    initialTime.current = 30;
  }

  useEffect(() => {
    interval.current = setInterval(() => {
      initialTime.current -= 1;
      setSec(padNumber(initialTime.current % 60, 1));
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  // 초가 변할 때만 실행되는 useEffect
  // initialTime을 검사해서 0이 되면 interval을 멈춘다.
  useEffect(() => {
    if (initialTime.current <= 0) {
      props.setIsTimeOut(true);
      clearInterval(interval.current);
    }
  }, [sec]);

  return (
    <div css={timerWrapper}>
      <div>
        <span>{sec}</span>초 안에 인증해주세요.
      </div>
      <button type="button" onClick={onClickReset}>
        시간 연장하기
      </button>
    </div>
  );
};

const timerWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    color: #66dd9c;

    & > span {
      font-weight: bold;
      font-size: 14px;
    }
  }

  & > button {
    margin-left: 4px;
    margin-top: 10px;
    cursor: pointer;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    text-decoration: underline;
  }
`;

export default QrCodeTimer;
