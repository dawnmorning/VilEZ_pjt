import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { postChatRoom } from "../api/chat"; //eslint-disable-line no-unused-vars
import baseProfile from "../assets/images/baseProfile.png";
import Map from "./common/Map";
import recommendLocationButton from "../assets/images/recommendLocationButton.png";
import selectDateButton from "../assets/images/selectDateButton.png";
import startWebRTCButton from "../assets/images/startWebRTCButton.png";

let client;

const Chatting = ({ writerNickname }) => {
  const scrollRef = useRef();

  const [chatRoomId, setChatRoomId] = useState(10); //eslint-disable-line no-unused-vars
  const [chatMessage, setChatMessage] = useState(""); // 클라이언트가 입력하는 메시지
  const [showingMessage, setShowingMessage] = useState([]); // 서버로부터 받는 메시지
  // 임시 데이터
  const [myUserId, setMyUserId] = useState(28); //eslint-disable-line no-unused-vars
  const [location, setLocation] = useState("");
  const [hopeAreaLat, setHopeAreaLat] = useState("");
  const [hopeAreaLng, setHopeAreaLng] = useState("");
  const [mapLevel, setMapLevel] = useState(0);
  const [movedLat, setMovedLat] = useState("");
  const [movedLng, setMovedLng] = useState("");
  const [movedLevel, setMovedLevel] = useState(0);

  function receiveLocation(location, lat, lng, level) {
    setLocation(location);
    setHopeAreaLat(lat);
    setHopeAreaLng(lng);
    setMapLevel(level);

    if (lat && lng && level) {
      let isMarker = false;

      if (location.includes("선택")) isMarker = true;

      const sendMap = {
        roomId: chatRoomId,
        toUserId: 29,
        lat: hopeAreaLat,
        lng: hopeAreaLng,
        zoomLevel: mapLevel,
        isMarker: isMarker,
      };

      client.send("/recvmap", {}, JSON.stringify(sendMap));
    }
  }

  function onChangeChatMessage(message) {
    setChatMessage(message);
  }

  function onKeyDownSendMessage(e) {
    if (e.keyCode === 13) {
      onClickSendMessage();
    }
  }

  function onClickSendMessage() {
    if (chatMessage === "") return;

    const sendMessage = {
      roomId: chatRoomId,
      boardId: 55,
      type: 2,
      fromUserId: 28,
      toUserId: 29,
      content: chatMessage,
      time: new Date().getTime(),
    };

    client.send("/recvchat", {}, JSON.stringify(sendMessage));

    setChatMessage("");
  }

  function scrollToBottom() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    const sockJS = new SockJS(`${process.env.REACT_APP_API_BASE_URL}/chat`);
    client = Stomp.over(sockJS);

    client.connect({}, () => {
      client.subscribe(`/sendchat/${chatRoomId}/${myUserId}`, (data) => {
        setShowingMessage((prev) => [...prev, JSON.parse(data.body)]);
      });

      client.subscribe(`/sendmy/${chatRoomId}/${myUserId}`, (data) => {
        setShowingMessage((prev) => [...prev, JSON.parse(data.body)]);
      });

      client.subscribe(`/sendmap/${chatRoomId}/${myUserId}`, (data) => {
        data = JSON.parse(data.body);

        setMovedLat(data.lat);
        setMovedLng(data.lng);
        setMovedLevel(data.zoomLevel);
      });

      client.activate();
    });
  }, []);

  // useEffect(() => {
  //   /** 방이 계속 만들어지니까 일단 주석처리하고 roomId 10번으로 쓰기 */
  //   // 공유자와 피공유자 사이에 연결되는 채팅방 id 받기
  //   // body값 임시 데이터
  //   postChatRoom({
  //     type: 2, // 요청글 1 공유글 2
  //     boardId: 55,
  //     shareUserId: 28,
  //     notShareUserId: 29,
  //   }).then((res) => {
  //     setChatRoomId(res[0].id);
  //   });
  // }, []);

  useEffect(() => {
    /** 소켓에 연결되면 채팅 내역 보여주기 */
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [showingMessage]);

  return (
    <>
      <div css={mapWrapper}>
        <span>{location}</span>
        <div>
          <Map
            readOnly={false}
            sendLocation={receiveLocation}
            movedLat={movedLat}
            movedLng={movedLng}
            movedLevel={movedLevel}
          />
        </div>
      </div>
      <div>
        <div css={menusWrapper}>
          <img src={selectDateButton} />
          <img src={startWebRTCButton} />
          <img src={recommendLocationButton} />
        </div>
        <div css={chatWrapper}>
          <div ref={scrollRef}>
            {showingMessage.map((message, index) => {
              if (message.fromUserId === myUserId) {
                return (
                  <div key={index} css={myMessageWrapper}>
                    <span>{message.content}</span>
                  </div>
                );
              } else {
                return (
                  <div key={index} css={yourMessageWrapper}>
                    <img src={baseProfile} />
                    <div>
                      <small>{writerNickname}</small>
                      <span>{message.content}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div>
            <input
              placeholder="메시지를 입력하세요."
              onChange={(e) => onChangeChatMessage(e.target.value)}
              onKeyDown={(e) => onKeyDownSendMessage(e)}
              value={chatMessage}
            />
            <small onClick={onClickSendMessage}>전송</small>
          </div>
        </div>
      </div>
    </>
  );
};

const mapWrapper = css`
  display: flex;
  flex-direction: column;
  width: 65%;

  & > div {
    margin-top: 10px;
    width: 100%;
    height: 600px;
  }
`;

const menusWrapper = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;

  & > img {
    cursor: pointer;
    width: 60px;
    height: 60px;
  }
`;

const chatWrapper = css`
  max-width: 100%;
  max-height: 550px;
  border: 1px solid #e1e2e3;
  border-radius: 10px;
  padding: 20px;

  & > div:nth-of-type(1) {
    width: 100%;
    height: 462px;
    margin-bottom: 20px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      height: 30%;
      background: #c4c4c4;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: none;
    }
  }

  & > div:nth-of-type(2) {
    max-width: 100%;
    height: 40px;
    padding: 0 20px;
    background: #ffffff;
    border: 1px solid #e1e2e3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > input {
      outline: none;
      border: none;
      width: 85%;
    }

    & > small {
      color: #66dd9c;
      cursor: pointer;
    }
  }
`;

const myMessageWrapper = css`
  text-align: right;
  margin-bottom: 10px;
  margin-right: 10px;

  & > span {
    font-size: 16px;
  }
`;

const yourMessageWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  justify-content: flex-start;

  & > img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  & > div {
    display: flex;
    flex-direction: column;

    & > span {
      font-size: 16px;
    }
  }
`;

export default Chatting;
