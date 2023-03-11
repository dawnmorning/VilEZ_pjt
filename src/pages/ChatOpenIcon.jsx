import React, { useEffect, useState } from "react";
import { BsChatSquare } from "react-icons/bs";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ChattingModal from "../components/modal/ChattingModal";
import { modalOpenState, enterChatRoomState, chatListState, boardState } from "../recoil/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const client = Stomp.over(function () {
  return new SockJS(`${process.env.REACT_APP_API_BASE_URL}/chat`);
});

function ChatOpenIcon() {
  const loginUserId = window.localStorage.getItem("id");
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [enterChatRoom, setEnterChatRoom] = useRecoilState(enterChatRoomState);
  const setChatList = useSetRecoilState(chatListState);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [boardFlag, setBoardFlag] = useRecoilState(boardState);
  const onClickOpenChat = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (loginUserId) {
      client.connect({}, () => {
        client.subscribe(`/sendlist/${loginUserId}`, () => {
          const payload = {
            userId: loginUserId,
          };
          setTimeout(() => client.send("/room_web", {}, JSON.stringify(payload)), 100);
        });

        client.subscribe(`/send_room_web/${loginUserId}`, (data) => {
          data = JSON.parse(data.body);
          setChatList(data);
          var flag = false;
          for (var i in data) {
            if (data[i].noReadCount > 0) {
              flag = true;
              break;
            }
          }
          setIsNewMessage(flag);
        });

        setIsSocketConnected(true);

        const sendMessage = {
          userId: loginUserId,
        };
        client.send("/room_web", {}, JSON.stringify(sendMessage));
      });
      client.debug = () => {};
    }
  }, []);

  useEffect(() => {
    if (enterChatRoom && loginUserId && isSocketConnected) {
      const data = {
        roomId: enterChatRoom,
        userId: loginUserId,
      };

      client.send("/room_enter", {}, JSON.stringify(data));
      setEnterChatRoom(null);
    }
  }, [enterChatRoom, loginUserId, isSocketConnected]);

  useEffect(() => {
    if (boardFlag.length == 0) {
      return;
    }
    var sendMessage = {
      boardId: boardFlag[0],
      type: boardFlag[1],
    };
    client.send("/recvdelete", {}, JSON.stringify(sendMessage));

    setBoardFlag([]);
  }, [boardFlag]);

  return (
    <>
      <div css={IconBox} onClick={onClickOpenChat}>
        <BsChatSquare size="25" />
        {isNewMessage ? <div css={newMessageAlarm}></div> : <></>}
      </div>
      {modalOpen ? <ChattingModal /> : null}
    </>
  );
}

const IconBox = css`
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  color: white;
  border: 1px solid white;
  background-color: #66dd9c;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: fixed;
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.35);
  z-index: 100;

  & > svg {
    position: absolute;
    top: calc(50%-12.5px);
  }
`;

const newMessageAlarm = css`
  position: absolute;
  border-radius: 100%;
  border: 1px solid white;
  width: 18px;
  height: 18px;
  top: 0;
  left: 0;
  background-color: #fc0101;
`;

export default ChatOpenIcon;
