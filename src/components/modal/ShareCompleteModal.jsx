import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MiddleWideButton from "../button/MiddleWideButton";

function ShareCompleteModal({ otherUserNickname, close }) {
  function onClickMovedetail() {
    close(false);
  }

  return (
    <div css={topWrap}>
      <div css={completeWrap}>
        <span>
          <b>{otherUserNickname}</b>님과의
        </span>
        <span>공유가 종료되었습니다. 😀</span>
        <div>
          <MiddleWideButton text={"확인"} onclick={onClickMovedetail} />
        </div>
      </div>
    </div>
  );
}

const topWrap = css`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const completeWrap = css`
  background-color: white;
  width: 400px;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;
  padding: 20px;

  & > span {
    font-size: 20px;
    margin-bottom: 20px;
  }

  & > div {
    width: 105px;
  }
`;

export default ShareCompleteModal;
