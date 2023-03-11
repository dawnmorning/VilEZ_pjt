import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const InputBox = ({ useMainList, placeholder, onChangeValue, value }) => {
  return (
    <input
      css={useMainList ? MainInputBox : inputBox}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChangeValue(e.target.value.toLowerCase())}
    />
  );
};

const inputBox = css`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 55px;
  border: 1px solid #e1e2e3;
  border-radius: 5px;
  font-size: 15px;
  background-color: #ffffff;
  outline: none;
  padding: 0 20px;
  & ::placeholder {
    color: #c4c4c4;
  }
`;

const MainInputBox = css`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 35px;
  border: 1px solid #e1e2e3;
  border-radius: 5px;
  font-size: 15px;
  background-color: #ffffff;
  outline: none;
  padding: 0 20px;
  & ::placeholder {
    color: #c4c4c4;
  }
`;

export default InputBox;
