import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Map from "./common/Map";
import selectDateButton from "../assets/images/selectDateButton.png";
import openOathButton from "../assets/images/openOathButton.png";
import { getLatestMapLocation, getChatHistory } from "../api/appointment";
import CalendarModal from "./modal/CalendarModal";
import { getOath } from "../api/oath";
import OathModal from "./modal/OathModal";
import { useRecoilState } from "recoil";
import {
  checkShareDateState,
  checkAppointmentState,
  checkShareCancelAskState,
  checkShareCancelState,
  checkShareReturnState,
  checkUserLeaveState,
  shareDataState,
} from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getCheckShareCancelRequest } from "../api/appointment";
import { getUserDetail } from "../api/user";

// let client = null;
const client = Stomp.over(function () {
  return new SockJS(`${process.env.REACT_APP_API_BASE_URL}/chat`);
});
const { kakao } = window;

const StompRealTime = ({
  roomId,
  boardId,
  otherUserId,
  otherUserNickname,
  shareUserId,
  shareState,
  roomState,
  sendShareState,
  isChatEnd,
  sendOtherLeave,
  sendRoomState,
}) => {
  const scrollRef = useRef();
  const myUserId = window.localStorage.getItem("id");
  const chatRoomId = roomId;
  const navigate = useNavigate();
  const shareData = useRecoilValue(shareDataState);

  const [checkShareDate, setCheckShareDate] = useRecoilState(checkShareDateState);
  const [checkAppointment, setCheckAppointment] = useRecoilState(checkAppointmentState);
  const [checkShareCancelAsk, setCheckShareCancelAsk] = useRecoilState(checkShareCancelAskState);
  const [checkShareCancel, setCheckShareCancel] = useRecoilState(checkShareCancelState);
  const [checkShareReturn, setCheckShareReturn] = useRecoilState(checkShareReturnState);
  const [checkUserLeave, setCheckUserLeave] = useRecoilState(checkUserLeaveState);

  const [chatMessage, setChatMessage] = useState(""); // 클라이언트가 입력하는 메시지
  const [showingMessage, setShowingMessage] = useState([]); // 서버로부터 받는 메시지
  const [hopeLocation, setHopeLocation] = useState("우클릭으로 지도에 마커를 찍어 공유지도를 시작해보세요!");
  const [movedLat, setMovedLat] = useState("");
  const [movedLng, setMovedLng] = useState("");
  const [movedZoomLevel, setMovedZoomLevel] = useState(0);
  const [movedMarker, setMovedMarker] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [isOathModalOpen, setIsOathModalOpen] = useState(false);
  const [oathSign, setOathSign] = useState("");
  const [disableMapLat, setDisableMapLat] = useState("");
  const [disableMapLng, setDisableMapLng] = useState("");
  const [cancelMessage, setCancelMessage] = useState({});
  const [otherUserProfileImage, setOtherUserProfileImage] = useState("");
  const [isOtherLeave, setIsOtherLeave] = useState(false);
  const [isZoomChanged, setIsZoomChanged] = useState(false);
  const [myZoomLevel, setMyZoomLevel] = useState(-10);

  function onKeyDownSendMessage(e) {
    if (e.keyCode === 13) {
      onClickSendMessage();
    }
  }

  function onChangeChatMessage(message) {
    setChatMessage(message);
  }

  function scrollToBottom() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  // 채팅 메시지 서버에 전송
  function onClickSendMessage() {
    if (chatMessage === "") return;

    const sendMessage = {
      roomId: chatRoomId,
      fromUserId: myUserId,
      toUserId: otherUserId,
      content: chatMessage,
      system: false,
      time: new Date().getTime(),
    };

    setShowingMessage((prev) => [...prev, sendMessage]);

    client.send("/recvchat", {}, JSON.stringify(sendMessage));

    setChatMessage("");
  }

  function searchDetailAddrFromCoords(lat, lng, callback) {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, callback);
  }

  function connectStomp() {
    client.connect({}, () => {
      // 다른 유저의 채팅을 구독
      let payload = {
        roomId: chatRoomId,
        userId: myUserId,
      };

      client.send("/room_enter", {}, JSON.stringify(payload));

      setTimeout(() => {
        payload = {
          userId: myUserId,
        };
        client.send("/room_web", {}, JSON.stringify(payload));
      }, 100);

      client.subscribe(`/sendchat/${chatRoomId}/${myUserId}`, (data) => {
        // 상대방이 채팅방을 나갔다면
        if (JSON.parse(data.body).fromUserId == -1 || JSON.parse(data.body).toUserId == -1) {
          sendOtherLeave(true);
          setIsOtherLeave(true);
          sendShareState(-1);
          sendRoomState(-1);
        }
        setShowingMessage((prev) => [...prev, JSON.parse(data.body)]);
        let payload = {
          roomId: chatRoomId,
          userId: myUserId,
        };
        client.send("/room_enter", {}, JSON.stringify(payload));
        payload = {
          userId: myUserId,
        };
        setTimeout(() => client.send("/room_web", {}, JSON.stringify(payload)), 100);
      });

      // 예약 확정을 구독
      client.subscribe(`/sendappoint/${chatRoomId}`, () => {
        sendShareState(0);
      });

      // 예약 취소를 구독
      client.subscribe(`/sendcancel/${chatRoomId}`, () => {
        sendShareState(-2);
      });

      // 공유 종료를 구독
      client.subscribe(`/sendend/${chatRoomId}`, () => {
        setIsOtherLeave(true);
        sendShareState(-1);
      });

      // 공유지도를 구독
      client.subscribe(`/sendmap/${chatRoomId}/${myUserId}`, (data) => {
        data = JSON.parse(data.body);

        if (myZoomLevel !== movedZoomLevel) {
          setIsZoomChanged(true);
        }

        // 다른 유저가 움직인 지도의 데이터들
        setMovedLat(data.lat);
        setMovedLng(data.lng);
        setMovedZoomLevel(data.zoomLevel);

        if (data.isMarker) {
          setMovedMarker(true);
          searchDetailAddrFromCoords(data.lat, data.lng, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              setHopeLocation(result[0].address.address_name);
            }
          });
        } else {
          setMovedMarker(false);
        }
      });
    });
  }

  useEffect(() => {
    // 웹소켓과 연결됐을 때 동작하는 콜백함수들
    connectStomp();
    client.debug = () => {};
  }, []);

  // Map에서 받은 데이터로 서버에 전송
  function receiveLocation(location, lat, lng, zoomLevel, isMarker) {
    if (isMarker) {
      searchDetailAddrFromCoords(lat, lng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setHopeLocation(result[0].address.address_name);
        }
      });
    }

    console.log(location, lat, lng, zoomLevel, isMarker);

    setMyZoomLevel(zoomLevel);

    if (isZoomChanged) {
      setIsZoomChanged(false);
      return;
    }

    const sendMapData = {
      roomId: chatRoomId,
      toUserId: otherUserId,
      lat: lat,
      lng: lng,
      zoomLevel: zoomLevel,
      isMarker: isMarker,
    };

    client.send("/recvmap", {}, JSON.stringify(sendMapData));
  }

  function onClickOpenCalendarModal() {
    // 예약 전일때는 공유자만 캘린더 클릭 가능
    if (shareState == -3) {
      if (myUserId == shareUserId) setCalendarModalOpen(true);
      else alert("공유자에게 공유 기간 설정을 요청해주세요 😀");
    }
    // 예약 후에는 공유자 피공유자 모두 캘린더 readOnly
    else {
      setCalendarModalOpen(true);
    }
  }

  function onClickOpenOath() {
    getOath(roomId).then((res) => {
      if (res) {
        // 모달로 oath 열어서 보여주기
        setOathSign(res.sign);
        setIsOathModalOpen(!isOathModalOpen);
      } else {
        alert("작성된 서약서가 없어요.");
      }
    });
  }

  const areaLat = window.localStorage.getItem("areaLat");
  const areaLng = window.localStorage.getItem("areaLng");

  useEffect(() => {
    if (chatRoomId) {
      getChatHistory(chatRoomId).then((res) => {
        if (res.length > 0) {
          setShowingMessage(res);
        }
        // 처음 입장하면 시스템 메시지 보내기
        else {
          setTimeout(() => {
            const sendMessage = {
              roomId: chatRoomId,
              fromUserId: myUserId,
              toUserId: otherUserId,
              content: "대화를 시작해보세요 😊",
              system: true,
              time: new Date().getTime(),
            };

            setShowingMessage([sendMessage]);
            connectStomp();

            var payload = {
              userId: otherUserId,
            };

            setTimeout(() => {
              client.send("/recvchat", {}, JSON.stringify(sendMessage));
              setTimeout(() => {
                client.send("/room_web", {}, JSON.stringify(payload));
              }, 100);
            }, 100);
          }, 100);
        }
      });
      /** 채팅방의 마지막 공유지도 장소 받기 */
      getLatestMapLocation(chatRoomId).then((res) => {
        // 마지막 장소가 있다면
        if (res) {
          res = res[0];

          // setMovedLat(res.lat);
          // setMovedLng(res.lng);
          // setMovedZoomLevel(res.zoomLevel);
          // setMovedMarker(res.isMarker);

          setDisableMapLat(res.lat);
          setDisableMapLng(res.lng);

          searchDetailAddrFromCoords(res.lat, res.lng, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              setHopeLocation(result[0].address.address_name);
            }
          });
        }
        // 마지막 장소가 없다면
        else {
          // 서울시청 좌표
          // setMovedLat(37.56682870560737);
          // setMovedLng(126.9786409384806);
          // setMovedZoomLevel(4);

          // 현재 사용자 위치로 지도 블락하기
          setDisableMapLat(areaLat);
          setDisableMapLng(areaLng);
        }
      });
    }
  }, [chatRoomId]);

  useEffect(() => {
    if (otherUserId) {
      getUserDetail(otherUserId).then((res) => {
        if (res) setOtherUserProfileImage(res.profile_img);
      });
    }
  }, [otherUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [showingMessage]);

  useEffect(() => {
    /* state : 0 예약 후, -1 반납 후, -2 예약 취소 후, -3 예약 전 */
    if (shareState == -1 || shareState == -2 || roomState == -1) {
      // 채팅방 막기
      const messageInput = document.getElementById("messageInput");
      messageInput.disabled = true;
      messageInput.placeholder = "채팅이 불가능합니다.";

      const messageSendButton = document.getElementById("messageSendButton");
      messageSendButton.hidden = true;
    }
  }, [shareState, roomState]);

  // 시스템 메시지
  useEffect(() => {
    // 공유 기간 설정
    if (checkShareDate) {
      const sendMessage = {
        roomId: chatRoomId,
        fromUserId: myUserId,
        toUserId: otherUserId,
        content: "공유기간이 설정됐어요! 아래의 예약 확정을 눌러주세요 😀",
        system: true,
        time: new Date().getTime(),
      };

      setShowingMessage((prev) => [...prev, sendMessage]);

      client.send("/recvchat", {}, JSON.stringify(sendMessage));

      setCheckShareDate(false);
    }

    // 예약 확정
    if (checkAppointment) {
      const sendMessage = {
        roomId: chatRoomId,
        fromUserId: myUserId,
        toUserId: otherUserId,
        content: "예약이 확정됐어요 🙂",
        system: true,
        time: new Date().getTime(),
      };

      const appointMessage = {
        boardId: shareData.boardId,
        appointmentStart: shareData.appointmentStart,
        appointmentEnd: shareData.appointmentEnd,
        shareUserId: shareData.shareUserId,
        notShareUserId: shareData.notShareUserId,
        type: shareData.boardType,
        roomId: chatRoomId,
      };

      setShowingMessage((prev) => [...prev, sendMessage]);

      client.send("/recvchat", {}, JSON.stringify(sendMessage));
      client.send("/recvappoint", {}, JSON.stringify(appointMessage));

      setCheckAppointment(false);
    }

    // 예약 취소 요청
    if (checkShareCancelAsk) {
      const sendMessage = {
        roomId: chatRoomId,
        fromUserId: myUserId,
        toUserId: otherUserId,
        content: "피공유자가 예약 취소를 요청했어요 ",
        system: true,
        time: new Date().getTime(),
      };

      setShowingMessage((prev) => [...prev, sendMessage]);

      client.send("/recvchat", {}, JSON.stringify(sendMessage));

      setCheckShareCancelAsk(false);
    }

    // 예약 취소
    if (checkShareCancel) {
      const sendMessage = {
        roomId: chatRoomId,
        fromUserId: myUserId,
        toUserId: otherUserId,
        content: "예약이 취소되어 대화가 종료됩니다.",
        system: true,
        time: new Date().getTime(),
      };

      getCheckShareCancelRequest(chatRoomId).then((res) => {
        // res : 공유자가 먼저 예약취소하면 null
        if (res == null) {
          setCancelMessage({
            roomId: chatRoomId,
            reason: 1,
          });
        }
        // res : 피공유자가 예약취소요청을 했다면 roomId
        else {
          setCancelMessage({
            roomId: chatRoomId,
            reason: 2,
          });
        }
      });

      setShowingMessage((prev) => [...prev, sendMessage]);

      client.send("/recvchat", {}, JSON.stringify(sendMessage));

      setCheckShareCancel(false);
    }

    // 반납 확인
    if (checkShareReturn) {
      const sendMessage = {
        roomId: chatRoomId,
        fromUserId: myUserId,
        toUserId: otherUserId,
        content: "반납이 확인됐어요 🙂",
        system: true,
        time: new Date().getTime(),
      };

      setShowingMessage((prev) => [...prev, sendMessage]);

      client.send("/recvchat", {}, JSON.stringify(sendMessage));

      setCheckShareReturn(false);
    }

    // 내가 채팅방 나감
    if (checkUserLeave) {
      if (!isOtherLeave) {
        const sendMessage = {
          roomId: chatRoomId,
          fromUserId: -1,
          toUserId: otherUserId,
          content: "대화가 종료됐어요 😥",
          system: true,
          time: new Date().getTime(),
        };

        setShowingMessage((prev) => [...prev, sendMessage]);

        if (roomState == 0) client.send("/recvchat", {}, JSON.stringify(sendMessage));
        setTimeout(() => client.send("/room_web", {}, JSON.stringify({ userId: myUserId })), 100);
      }

      setCheckUserLeave(false);
      navigate(`/product/list/share`);
    }

    // 공유 종료됨을 알림
    if (isChatEnd) {
      if (!isOtherLeave) {
        const sendMessage = {
          roomId: chatRoomId,
          fromUserId: myUserId,
          toUserId: otherUserId,
          content: "공유가 종료되었어요 😊",
          system: true,
          time: new Date().getTime(),
        };

        setShowingMessage((prev) => [...prev, sendMessage]);

        client.send("/recvchat", {}, JSON.stringify(sendMessage));
        client.send("/recvend", {}, JSON.stringify({ roomId: roomId }));
      }
    }
  }, [
    checkShareDate,
    checkAppointment,
    checkShareCancelAsk,
    checkShareCancel,
    checkShareReturn,
    checkUserLeave,
    isChatEnd,
  ]);

  useEffect(() => {
    if (cancelMessage.roomId && cancelMessage.reason) {
      client.send("/recvcancel", {}, JSON.stringify(cancelMessage));
    }
  }, [cancelMessage]);

  return (
    <>
      <div css={mapWrapper}>
        <span>{hopeLocation}</span>
        <div>
          {shareState == -1 || shareState == -2 || roomState == -1 ? (
            // 공유지도 막기
            <Map
              readOnly={true}
              disableMapLat={disableMapLat}
              disableMapLng={disableMapLng}
              path="block"
              chatRoomId={chatRoomId}
            />
          ) : (
            <Map
              readOnly={false}
              sendLocation={receiveLocation}
              movedLat={movedLat}
              movedLng={movedLng}
              movedZoomLevel={movedZoomLevel}
              movedMarker={movedMarker}
              path="stomp"
              chatRoomId={chatRoomId}
            />
          )}
        </div>
      </div>
      <div>
        <div css={menusWrapper}>
          <div onClick={onClickOpenCalendarModal}>
            <img src={selectDateButton} />
            <span>공유 기간 확정</span>
          </div>
          <div onClick={onClickOpenOath}>
            <img src={openOathButton} />
            <span>서약서 확인</span>
          </div>
        </div>
        {calendarModalOpen && (
          <CalendarModal setCalendarModalOpen={setCalendarModalOpen} boardId={boardId} shareState={shareState} />
        )}
        <div css={chatWrapper}>
          <div ref={scrollRef}>
            {showingMessage.map((message, index) => {
              if (message.system) {
                return (
                  <div key={index} css={systemMessageWrapper}>
                    <span>{message.content}</span>
                  </div>
                );
              } else {
                if (message.fromUserId == myUserId) {
                  return (
                    <div key={index} css={myMessageWrapper}>
                      <span>{message.content}</span>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} css={yourMessageWrapper}>
                      <img src={otherUserProfileImage} />
                      <div>
                        <small>{otherUserNickname}</small>
                        <span>{message.content}</span>
                      </div>
                    </div>
                  );
                }
              }
            })}
          </div>
          <div>
            <input
              placeholder="메시지를 입력하세요."
              onChange={(e) => onChangeChatMessage(e.target.value)}
              onKeyDown={(e) => onKeyDownSendMessage(e)}
              value={chatMessage}
              id="messageInput"
            />
            <small onClick={onClickSendMessage} id="messageSendButton">
              전송
            </small>
          </div>
        </div>
      </div>
      {isOathModalOpen ? (
        <OathModal close={setIsOathModalOpen} roomId={roomId} readOnly={true} oathSign={oathSign} />
      ) : null}
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

  & > div {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
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
    overflow-x: hidden;
  }

  & > div:nth-of-type(2) {
    max-width: 100%;
    height: 40px;
    padding: 0 20px;
    background-color: #ffffff;
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

      &:disabled {
        background-color: #ffffff;
      }
    }

    & > small {
      color: #66dd9c;
      cursor: pointer;
    }
  }
`;

const systemMessageWrapper = css`
  text-align: center;
  margin-bottom: 15px;

  & > span {
    font-size: 12px;
  }
`;

const myMessageWrapper = css`
  text-align: left;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  margin-right: 10px;

  & > span {
    font-size: 14px;
    padding: 5px 8px;
    background-color: #66dd9c50;
    border-radius: 5px;
  }
`;

const yourMessageWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  justify-content: flex-start;

  & > img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 100%;
  }

  & > div {
    display: flex;
    flex-direction: column;

    & > small {
      font-size: 12px;
    }

    & > span {
      font-size: 14px;
      padding: 5px 8px;
      background-color: #ededed;
      border-radius: 5px;
    }
  }
`;

export default StompRealTime;
