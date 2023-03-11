import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MiddleWideButton from "../button/MiddleWideButton";
import { deleteChatRoom } from "../../api/appointment";
import { checkUserLeaveState } from "../../recoil/atom";
import { useSetRecoilState } from "recoil";

function QuitChattingModal({ close, roomId }) {
  const loginUserId = window.localStorage.getItem("id");
  const setCheckUserLeave = useSetRecoilState(checkUserLeaveState);

  function onClickCancel() {
    close(false);
  }

  function onClickNavigate() {
    deleteChatRoom(roomId, loginUserId).then((res) => {
      if (res) {
        setCheckUserLeave(true); // stomp로 알리고
      }
    });
  }

  return (
    <div css={topWrap}>
      <div css={ModalWrap}>
        <span>채팅을 완전히 종료하시겠어요?</span>
        <div>
          <MiddleWideButton text={"취소"} onclick={onClickCancel} cancel={true} />
          <MiddleWideButton text={"네, 종료할래요"} onclick={onClickNavigate} />
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

const ModalWrap = css`
  background-color: white;
  width: 380px;
  height: 180px;
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

  & > div {
    margin-top: 30px;
    width: 320px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > button {
      width: 150px;
    }
  }
`;

export default QuitChattingModal;
