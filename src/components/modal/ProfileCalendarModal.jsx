import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getQrCode, deleteQrCode } from "../../api/qr";
import MiddleWideButton from "../button/MiddleWideButton";
import { IoCloseSharp } from "react-icons/io5";

function ProfileCalendarModal({ setIsQrCodeOpen }) {
  const userId = window.localStorage.getItem("id");
  const [qrCode, setQrCode] = useState("");

  function onClickClose() {
    setIsQrCodeOpen(false);
    deleteQrCode(qrCode.slice(42, qrCode.length));
  }

  useEffect(() => {
    getQrCode(userId).then((response) => {
      setQrCode(response[0].path);
    });
  }, []);

  return (
    <div css={qrWrap}>
      <h3>동네 인증하기</h3>
      <div>
        휴대폰으로 QR코드를 찍어 <br />
        동네 인증을 진행해주세요.
      </div>

      <button type="button" onClick={onClickClose}>
        <IoCloseSharp size={20} />
      </button>
      <MiddleWideButton text={"인증 완료"} onclick={onClickClose} />
    </div>
  );
}

const qrWrap = css`
  position: relative;
  padding: 60px 20px 30px;
  width: 340px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 1px 1px 2px;

  & > h3 {
    text-align: center;
    padding-bottom: 10px;
  }

  & > div {
    display: flex;
    justify-content: center;
    font-size: 14px;
  }

  & > div:nth-of-type(1) {
    padding-top: 14px;
  }

  & > div:nth-of-type(2) {
    position: relative;
    height: 200px;
    margin-top: 20px;

    & > img {
      box-sizing: border-box;
      width: 180px;
      height: 180px;
      border: 10px solid #66dd9c;
      border-radius: 10px;
    }

    & > div {
      cursor: pointer;
      position: absolute;
      top: 10px;
      left: calc(50% - 80px);
      width: 160px;
      height: 160px;
      background-color: #f5f5f5ea;
      backdrop-filter: contrast(80%);
      border-radius: 5px;
      :hover button > div {
        transform: rotate(45deg);
        background-color: #66dd9c;
      }
    }

    & button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 65px;
      width: 160px;
      height: 160px;
      border: none;
      height: 30px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0);

      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        transition: all 0.3s;
      }
    }
  }

  & > div:nth-of-type(3) {
    padding-top: 4px;
  }

  & > button:nth-of-type(1) {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }

  & > button:nth-of-type(2) {
    margin-top: 40px;
  }
`;

export default ProfileCalendarModal;
