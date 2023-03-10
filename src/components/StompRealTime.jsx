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

  const [chatMessage, setChatMessage] = useState(""); // ?????????????????? ???????????? ?????????
  const [showingMessage, setShowingMessage] = useState([]); // ??????????????? ?????? ?????????
  const [hopeLocation, setHopeLocation] = useState("??????????????? ????????? ????????? ?????? ??????????????? ??????????????????!");
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

  // ?????? ????????? ????????? ??????
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
      // ?????? ????????? ????????? ??????
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
        // ???????????? ???????????? ????????????
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

      // ?????? ????????? ??????
      client.subscribe(`/sendappoint/${chatRoomId}`, () => {
        sendShareState(0);
      });

      // ?????? ????????? ??????
      client.subscribe(`/sendcancel/${chatRoomId}`, () => {
        sendShareState(-2);
      });

      // ?????? ????????? ??????
      client.subscribe(`/sendend/${chatRoomId}`, () => {
        setIsOtherLeave(true);
        sendShareState(-1);
      });

      // ??????????????? ??????
      client.subscribe(`/sendmap/${chatRoomId}/${myUserId}`, (data) => {
        data = JSON.parse(data.body);

        if (myZoomLevel !== movedZoomLevel) {
          setIsZoomChanged(true);
        }

        // ?????? ????????? ????????? ????????? ????????????
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
    // ???????????? ???????????? ??? ???????????? ???????????????
    connectStomp();
    client.debug = () => {};
  }, []);

  // Map?????? ?????? ???????????? ????????? ??????
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
    // ?????? ???????????? ???????????? ????????? ?????? ??????
    if (shareState == -3) {
      if (myUserId == shareUserId) setCalendarModalOpen(true);
      else alert("??????????????? ?????? ?????? ????????? ?????????????????? ????");
    }
    // ?????? ????????? ????????? ???????????? ?????? ????????? readOnly
    else {
      setCalendarModalOpen(true);
    }
  }

  function onClickOpenOath() {
    getOath(roomId).then((res) => {
      if (res) {
        // ????????? oath ????????? ????????????
        setOathSign(res.sign);
        setIsOathModalOpen(!isOathModalOpen);
      } else {
        alert("????????? ???????????? ?????????.");
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
        // ?????? ???????????? ????????? ????????? ?????????
        else {
          setTimeout(() => {
            const sendMessage = {
              roomId: chatRoomId,
              fromUserId: myUserId,
              toUserId: otherUserId,
              content: "????????? ?????????????????? ????",
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
      /** ???????????? ????????? ???????????? ?????? ?????? */
      getLatestMapLocation(chatRoomId).then((res) => {
        // ????????? ????????? ?????????
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
        // ????????? ????????? ?????????
        else {
          // ???????????? ??????
          // setMovedLat(37.56682870560737);
          // setMovedLng(126.9786409384806);
          // setMovedZoomLevel(4);

          // ?????? ????????? ????????? ?????? ????????????
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
    /* state : 0 ?????? ???, -1 ?????? ???, -2 ?????? ?????? ???, -3 ?????? ??? */
    if (shareState == -1 || shareState == -2 || roomState == -1) {
      // ????????? ??????
      const messageInput = document.getElementById("messageInput");
      messageInput.disabled = true;
      messageInput.placeholder = "????????? ??????????????????.";

      const messageSendButton = document.getElementById("messageSendButton");
      messageSendButton.hidden = true;
    }
  }, [shareState, roomState]);

  // ????????? ?????????
  useEffect(() => {
    // ?????? ?????? ??????
    if (checkShareDate) {
      const sendMessage = {
        roomId: chatRoomId,
        fromUserId: myUserId,
        toUserId: otherUserId,
        content: "??????????????? ???????????????! ????????? ?????? ????????? ??????????????? ????",
        system: true,
        time: new Date().getTime(),
      };

      setShowingMessage((prev) => [...prev, sendMessage]);

      client.send("/recvchat", {}, JSON.stringify(sendMessage));

      setCheckShareDate(false);
    }

    // ?????? ??????
    if (checkAppointment) {
      const sendMessage = {
        roomId: chatRoomId,
        fromUserId: myUserId,
        toUserId: otherUserId,
        content: "????????? ??????????????? ????",
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

    // ?????? ?????? ??????
    if (checkShareCancelAsk) {
      const sendMessage = {
        roomId: chatRoomId,
        fromUserId: myUserId,
        toUserId: otherUserId,
        content: "??????????????? ?????? ????????? ??????????????? ",
        system: true,
        time: new Date().getTime(),
      };

      setShowingMessage((prev) => [...prev, sendMessage]);

      client.send("/recvchat", {}, JSON.stringify(sendMessage));

      setCheckShareCancelAsk(false);
    }

    // ?????? ??????
    if (checkShareCancel) {
      const sendMessage = {
        roomId: chatRoomId,
        fromUserId: myUserId,
        toUserId: otherUserId,
        content: "????????? ???????????? ????????? ???????????????.",
        system: true,
        time: new Date().getTime(),
      };

      getCheckShareCancelRequest(chatRoomId).then((res) => {
        // res : ???????????? ?????? ?????????????????? null
        if (res == null) {
          setCancelMessage({
            roomId: chatRoomId,
            reason: 1,
          });
        }
        // res : ??????????????? ????????????????????? ????????? roomId
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

    // ?????? ??????
    if (checkShareReturn) {
      const sendMessage = {
        roomId: chatRoomId,
        fromUserId: myUserId,
        toUserId: otherUserId,
        content: "????????? ??????????????? ????",
        system: true,
        time: new Date().getTime(),
      };

      setShowingMessage((prev) => [...prev, sendMessage]);

      client.send("/recvchat", {}, JSON.stringify(sendMessage));

      setCheckShareReturn(false);
    }

    // ?????? ????????? ??????
    if (checkUserLeave) {
      if (!isOtherLeave) {
        const sendMessage = {
          roomId: chatRoomId,
          fromUserId: -1,
          toUserId: otherUserId,
          content: "????????? ??????????????? ????",
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

    // ?????? ???????????? ??????
    if (isChatEnd) {
      if (!isOtherLeave) {
        const sendMessage = {
          roomId: chatRoomId,
          fromUserId: myUserId,
          toUserId: otherUserId,
          content: "????????? ?????????????????? ????",
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
            // ???????????? ??????
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
            <span>?????? ?????? ??????</span>
          </div>
          <div onClick={onClickOpenOath}>
            <img src={openOathButton} />
            <span>????????? ??????</span>
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
              placeholder="???????????? ???????????????."
              onChange={(e) => onChangeChatMessage(e.target.value)}
              onKeyDown={(e) => onKeyDownSendMessage(e)}
              value={chatMessage}
              id="messageInput"
            />
            <small onClick={onClickSendMessage} id="messageSendButton">
              ??????
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
