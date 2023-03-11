import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// props로 outline(boolean) 전달해주면 true일 때 outline 있는 버튼으로 스타일 변경
const LargeWideButton = ({ text, outline, onClick }) => {
  return (
    <button css={outline ? outlinedButton : basicButton} onClick={onClick}>
      {text}
    </button>
  );
};

const basicButton = css`
  cursor: pointer;
  display: block;
  height: 55px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  background-color: #66dd9c;
  padding: 0 20px;
  color: #fff;
`;

const outlinedButton = css`
  cursor: pointer;
  display: block;
  height: 55px;
  width: 100%;
  border: 1px solid #66dd9c;
  border-radius: 5px;
  font-size: 18px;
  background-color: #fff;
  margin-top: 14px;
  padding: 0 20px;
  color: #66dd9c;
`;

export default LargeWideButton;
