import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ChattingModalItem from "./ChattingModalItem";
import { chatListState } from "../../recoil/atom";
import { useRecoilValue } from "recoil";

function ChattingModal() {
  const chatList = useRecoilValue(chatListState);

  return (
    <div css={chatWrap}>
      <span>채팅 목록</span>
      <div css={chatContentWrap}>
        {chatList && chatList.length ? (
          chatList.map((chat) => {
            return <ChattingModalItem chat={chat} key={chat.chatData.roomId} />;
          })
        ) : (
          <div css={NochatWrap}>
            <span>채팅목록이 없어요 😥</span>
          </div>
        )}
      </div>
    </div>
  );
}

const chatWrap = css`
  width: 360px;
  height: 480px;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  position: fixed;
  bottom: 100px;
  right: 20px;
  background-color: #f5f6f7;
  z-index: 10000;
  animation: zoomin 0.2s ease-in-out;

  @keyframes zoomin {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  & > span {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const NochatWrap = css`
  display: flex;
  justify-content: center;
  padding-top: 50%;
`;

const chatContentWrap = css`
  margin-top: 65px;
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 20px;
  height: 385px;
  overflow-y: scroll;
`;

export default ChattingModal;
