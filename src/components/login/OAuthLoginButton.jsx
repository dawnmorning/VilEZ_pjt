import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const OAuthLoginButton = ({ text, src, alt, backgroundColor, color }) => {
  return (
    <button type="button" css={oauthButton} style={{ backgroundColor, color }}>
      <div css={socialLogo}>
        <img src={src} alt={alt} />
      </div>
      <div css={socialName}>{text}</div>
    </button>
  );
};

const oauthButton = css`
  cursor: pointer;
  display: flex;
  position: relative;
  height: 55px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  align-items: center;
  margin-top: 14px;
  padding: 0 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

const socialLogo = css`
  position: absolute;
  left: 20px;
  width: 40px;
  height: 55px;
  margin-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const socialName = css`
  width: 100%;
  text-align: center;
`;

export default OAuthLoginButton;
