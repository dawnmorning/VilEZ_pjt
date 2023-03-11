import React from "react";
import { css } from "@emotion/react";
import MiddleWideButton from "./../button/MiddleWideButton";

const RealDeleteModal = () => {
  return (
    <div css={DeleteTop}>
      <div css={DeleteWrap}>
        <div>정말 삭제하시겠어요?</div>
        <div css={buttonWrap}>
          <MiddleWideButton text="아니오" cancel={true} />
          <MiddleWideButton text="네" />
        </div>
      </div>
    </div>
  );
};

const DeleteTop = css`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const DeleteWrap = css`
  position: fixed;
  width: 500px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  z-index: 9999;

  display: flex;
  flex-direction: column-reverse;
`;

const buttonWrap = css`
  display: flex;
  width: 350px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;

  & > button {
    width: 170px;
  }
`;
export default RealDeleteModal;
