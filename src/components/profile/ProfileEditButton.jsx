import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// props로 outline(boolean) 전달해주면 true일 때 outline 있는 버튼으로 스타일 변경
const ProfileEditButton = ({ text, outline, onClick }) => {
  return (
    <button css={[outline ? outlinedButton : basicButton]} onClick={onClick}>
      {text}
    </button>
  );
};

const basicButton = css`
  position: absolute;
  top: -35px;
  right: 10px;
  cursor: pointer;
  display: block;
  height: 35px;
  width: 160px;
  border: none;
  border-radius: 5px 5px 0 0;
  font-size: 18px;
  background-color: #66dd9c;
  padding: 0 20px;
  color: #fff;
`;
const outlinedButton = css`
  position: absolute;
  top: -35px;
  right: 10px;
  cursor: pointer;
  display: block;
  height: 35px;
  width: 100%;
  border: 1px solid #66dd9c;
  border-radius: 5px;
  font-size: 18px;
  background-color: #fff;
  padding: 0 20px;
  color: #66dd9c;
`;
export default ProfileEditButton;
