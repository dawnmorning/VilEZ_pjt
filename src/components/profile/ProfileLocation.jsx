import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import location_icon from "../../assets/images/location_icon.png";
// import { useState } from "react";
// import { useEffect } from "react";
const ProfileLocation = (props) => {
  function modalQrcode() {
    props.setIsQrCodeOpen(true);
  }
  return (
    <div css={locationWrapper}>
      <div>
        <h4>나의 동네</h4>
        <div css={locationIcon}></div>
        <div>{props.location}</div>
        <button css={locationButton} onClick={modalQrcode}>
          동네 인증하기
        </button>
      </div>
    </div>
  );
};

const locationWrapper = css`
  width: 28%;
  height: 100%;
  border-right: 1px solid #d8d8d8;
  & > div {
    width: 100%;
    max-width: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding-top: 20px;
    & > div:nth-of-type(2) {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
  }
`;
const locationIcon = css`
  width: 100%;
  height: 150px;
  background-image: url(${location_icon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;
const locationButton = css`
  cursor: pointer;
  display: block;
  height: 35px;
  line-height: 35px;
  width: 140px;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  background-color: #66dd9c;
  margin-top: 14px;
  padding: 0 10px;
  color: #fff;
`;

export default ProfileLocation;
