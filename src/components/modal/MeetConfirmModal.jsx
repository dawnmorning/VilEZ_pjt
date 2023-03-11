import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MiddleWideButton from "./../button/MiddleWideButton";

function MeetConfirmModal({ close, openOath, otherUserNickname, confirmedStartDate, confirmedEndDate }) {
  function closeModal() {
    close(false);
  }

  function onClickOpenOath() {
    openOath(true);
    close(false);
  }

  return (
    <div>
      {close && (
        <div css={modalTop}>
          <div css={ModalWrap}>
            <span>
              <strong>{otherUserNickname} 님과</strong>
            </span>
            <span>
              <strong>
                {confirmedStartDate} ~ {confirmedEndDate}
              </strong>
            </span>
            <span>기간동안</span>
            <span>물품을 공유하시겠어요?</span>
            <div css={buttonWrap}>
              <MiddleWideButton text={"취소"} onclick={closeModal} cancel={true} />
              <MiddleWideButton text={"네, 공유할래요"} onclick={onClickOpenOath} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalTop = css`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalWrap = css`
  position: fixed;
  padding: 20px;
  width: 450px;
  height: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;

  & > span {
    margin-bottom: 15px;
  }
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

export default MeetConfirmModal;
