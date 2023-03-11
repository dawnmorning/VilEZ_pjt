import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const onKeyDown = (event) => {
  if (event.code === "Enter") {
    event.preventDefault();
  }
};
const SignupInputBox = ({ placeholder, name, onChange, onClick, type, disabled }) => {
  return (
    <input
      css={[signupInputBox, inputPlaceholder]}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onClick={onClick}
      type={type}
      onKeyDown={onKeyDown}
      disabled={disabled}
    />
  );
};

const signupInputBox = css`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 55px;
  border: 1px solid #e1e2e3;
  border-radius: 5px;
  font-size: 18px;
  background-color: #ffffff;
  outline: none;
  padding: 0 20px;
`;

const inputPlaceholder = css`
  ::placeholder {
    color: #c4c4c4;
  }
`;

export default SignupInputBox;
