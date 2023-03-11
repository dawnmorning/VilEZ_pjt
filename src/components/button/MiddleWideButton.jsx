import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// props로 outline(boolean) 전달해주면 true일 때 outline 있는 버튼으로 스타일 변경
const MiddleWideButton = ({ text, outline, onclick, cancel, isActive }) => {
  return (
    <button
      css={[outline ? outlinedButton : cancel ? cancelButton : isActive ? nonActiveButton : basicButton]}
      onClick={onclick}
    >
      {text}
    </button>
  );
};

const basicButton = css`
  cursor: pointer;
  display: block;
  height: 45px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  background-color: #66dd9c;
  margin-top: 14px;
  padding: 0 20px;
  color: #fff;
`;

const outlinedButton = css`
  cursor: pointer;
  display: block;
  height: 45px;
  width: 100%;
  border: 1px solid #66dd9c;
  border-radius: 5px;
  font-size: 18px;
  background-color: #fff;
  margin-top: 14px;
  padding: 0 20px;
  color: #66dd9c;
`;

const cancelButton = css`
  background-color: #d7d9dc;
  cursor: pointer;
  display: block;
  height: 45px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  margin-top: 14px;
  padding: 0 20px;
  color: #fff;
`;

const nonActiveButton = css`
  cursor: not-allowed;
  display: block;
  height: 45px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  background-color: #c4c4c4;
  margin-top: 14px;
  padding: 0 20px;
  color: #fff;
`;

export default MiddleWideButton;
