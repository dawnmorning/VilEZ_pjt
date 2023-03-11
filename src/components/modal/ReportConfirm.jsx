import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ReportConfirm() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickClose = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <div css={confirmWrap}>
        <div>신고가 정상적으로</div>
        <div>제출되었어요.</div>
        <div>빠른 시일내에 알려드릴게요.</div>
        <div>
          <button css={goodbutton} onClick={onClickClose}>
            확인
          </button>
        </div>
      </div>
    );
  }
  return null;
}

const confirmWrap = css`
  font-size: 20px;
  margin: auto;
  margin-bottom: 100px;
  width: 600px;
  height: 450px;
  box-shadow: 1px 1px 5px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    padding: 10px;
  }
`;

const goodbutton = css`
  width: 105px;
  background-color: #66dd9c;
  color: white;
  border: none;
  height: 45px;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
`;

export default ReportConfirm;
