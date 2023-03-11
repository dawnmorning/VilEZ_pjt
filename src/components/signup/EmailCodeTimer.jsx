import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

const EmailCodeTimer = (props) => {
  // 타이머를 초단위로 변환한 initialTime과 setInterval을 저장할 interval ref
  const initialTime = useRef(180);
  const interval = useRef(null);

  const [min, setMin] = useState(padNumber(3, 2));
  const [sec, setSec] = useState(padNumber(0, 2));

  useEffect(() => {
    interval.current = setInterval(() => {
      initialTime.current -= 1;
      setSec(padNumber(initialTime.current % 60, 2));
      setMin(padNumber(parseInt(initialTime.current / 60), 2));
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  // 초가 변할 때만 실행되는 useEffect
  // initialTime을 검사해서 0이 되면 interval을 멈춘다.
  useEffect(() => {
    if (initialTime.current <= 0) {
      props.setIsTimeOut(true);
      props.setHashedCode("");
      clearInterval(interval.current);
    }
  }, [sec]);
  return (
    <div css={timerWrapper}>
      <div>
        {min}:{sec}
      </div>
    </div>
  );
};

const timerWrapper = css``;

export default EmailCodeTimer;
