import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MiddleWideButton from "../button/MiddleWideButton";
import { useSetRecoilState } from "recoil";
import { checkShareCancelState } from "../../recoil/atom";

const ShareCancelModal = ({ close, otherUserNickname }) => {
  const setCheckShareCancel = useSetRecoilState(checkShareCancelState);

  function onCloseModal() {
    close(false);
  }

  function onClickShareCancel() {
    setCheckShareCancel(true); // stomp로 전달하기
    close(false); // 모달 닫기
  }

  return (
    <div css={topWrapper}>
      <div css={shareCancelAskWrapper}>
        <span>{otherUserNickname}님과의 예약을 정말 취소하시겠습니까?</span>
        <small>* 예약 취소를 하면 다시 되돌릴 수 없습니다.</small>
        <div css={buttonWrapper}>
          <MiddleWideButton text={"취소"} onclick={onCloseModal} cancel={true} />
          <MiddleWideButton text={"예약 취소"} onclick={onClickShareCancel} />
        </div>
      </div>
    </div>
  );
};

const topWrapper = css`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const shareCancelAskWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 500px;
  height: 260px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;

  & > small {
    margin: 40px 0 20px 0;
    font-weight: bold;
    color: #fc0101;
  }
`;

const buttonWrapper = css`
  display: flex;
  width: 320px;
  flex-direction: row;
  justify-content: space-between;

  & > button {
    width: 130px;
  }
`;

export default ShareCancelModal;
