import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { shareDateState } from "../../recoil/atom";

function MeetConfirmModal({ close, openOath, otherUserNickname }) {
  const shareDate = useRecoilValue(shareDateState);
  const startdate = shareDate.startDate;
  const enddate = shareDate.endDate;

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
            <strong>{otherUserNickname}님과</strong>
            <div>
              <strong>
                {startdate} ~ {enddate}
              </strong>
            </div>
            <div>기간동안</div>
            <div>물품을 공유하시겠어요?</div>
            <div css={buttonWrap}>
              <button css={badbutton} onClick={closeModal}>
                취소
              </button>
              <button css={goodbutton} onClick={onClickOpenOath}>
                제출하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalTop = css`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrap = css`
  position: absolute;
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
  background-color: white;
`;

const buttonWrap = css`
  margin-top: 50px;
`;

const goodbutton = css`
  width: 105px;
  background-color: #66dd9c;
  color: white;
  border: none;
  height: 45px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
`;

const badbutton = css`
  width: 105px;
  background-color: #aeaeae;
  color: white;
  border: none;
  height: 45px;
  font-size: 14px;
  border-radius: 5px;
  margin-right: 30px;
  cursor: pointer;
`;

export default MeetConfirmModal;
