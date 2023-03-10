import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ProductInfo from "./ProductInfo";
import MiddleWideButton from "../button/MiddleWideButton";
import StompRealTime from "../StompRealTime";
import MeetConfirmModal from "../modal/MeetConfirmModal";
import QuitChattingModal from "../modal/QuitChattingModal";
import OathModal from "../modal/OathModal";
import { useParams, useNavigate } from "react-router-dom";
import { deleteChatRoom, getBoardIdByRoomId } from "../../api/appointment";
import { getChattingRoomState } from "../../api/back";
import { getAskArticleDetailByBoardId } from "../../api/ask";
import { getShareArticleByBoardId } from "../../api/share";
import { getUserDetail } from "../../api/user";
import { useSetRecoilState } from "recoil";
import { shareDataState } from "../../recoil/atom";
import { getShareDate } from "../../api/appointment";
import DateFormat from "../common/DateFormat";
import { getShareReturnState } from "../../api/back";
import ProductReturnModal from "../modal/ProductReturnModal";
import ShareCompleteModal from "../modal/ShareCompleteModal";
import ShareCancelAskModal from "../modal/ShareCancelAskModal";
import ShareCancelModal from "../modal/ShareCancelModal";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import SequenceCompleteModal from "../modal/SequenceCompleteModal";

const ProductChatting = () => {
  const { roomId } = useParams();
  const loginUserId = window.localStorage.getItem("id");
  const navigate = useNavigate();

  const setShareData = useSetRecoilState(shareDataState);

  const [isConfirm, setIsConfirm] = useState(false);
  const [isOath, setIsOath] = useState(false);
  const [isQuit, setIsQuit] = useState(false);
  const [isProductReturn, setIsProductReturn] = useState(false);
  const [isShareComplete, setIsShareComplete] = useState(false);
  const [isShareCancel, setIsShareCancel] = useState(false);
  const [isShareCancelAsk, setIsShareCancelAsk] = useState(false);

  const [otherUserId, setOtherUserId] = useState(null);
  const [shareUserId, setShareUserId] = useState(null);
  const [notShareUserId, setNotShareUserId] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const [boardType, setBoardType] = useState(null);
  const [boardDetail, setBoardDetail] = useState({
    otherUserNickname: "",
    thumbnailImage: "",
    boardId: boardId,
    title: "",
    location: "",
    startDay: "",
    endDay: "",
    bookmarkCnt: "",
  });
  const [confirmedStartDate, setConfirmedStartDate] = useState("");
  const [confirmedEndDate, setConfirmedEndDate] = useState("");
  const [shareState, setShareState] = useState(null);
  const [roomState, setRoomState] = useState(0);
  const [isChatEnd, setIsChatEnd] = useState(false);
  const [isOtherLeave, setIsOtherLeave] = useState(false);
  const [myPoint, setMyPoint] = useState(0);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);

  // ?????? ?????????
  function onClickQuit() {
    // ???????????? ?????? ???????????? ?????? ?????????
    // ?????? ?????? ?????? ????????? ??????
    if (isOtherLeave) {
      deleteChatRoom(roomId, loginUserId).then((res) => {
        if (res) {
          const client = Stomp.over(function () {
            return new SockJS(`${process.env.REACT_APP_API_BASE_URL}/chat`); // STOMP ????????? ??????????????? url
          }); // ????????? ??????????????? ??????
          client.connect({}, () => {
            var payload = {
              userId: loginUserId,
            };
            client.send("/room_web", {}, JSON.stringify(payload));
          });

          navigate(`/product/list/share`);
        }
      });
    }
    // ?????? ?????? ??????????????? stomp???
    else {
      setIsQuit(true);
    }
  }

  function receiveOtherLeave(flag) {
    // ???????????? ????????????
    if (flag) setIsOtherLeave(true);
  }

  // ??????(??????) ??????
  function onClickConfirm() {
    if (myPoint < 30) {
      alert("????????? ??????????????? ???????????? ????????????. ?????? ???????????? ????????? ??????????????? ???????????? ???????????? ????");
      return;
    }

    getShareDate(boardId, notShareUserId, shareUserId, boardType).then((res) => {
      res = res[0];

      // ???????????? ????????? ???????????????
      if (res) {
        res.startDay = DateFormat(new Date(res.startDay));
        res.endDay = DateFormat(new Date(res.endDay));
        setConfirmedStartDate(res.startDay);
        setConfirmedEndDate(res.endDay);

        // recoil??? ?????? ??????????????? ????????? ??????
        setShareData((prev) => {
          return {
            ...prev,
            appointmentStart: res.startDay,
            appointmentEnd: res.endDay,
          };
        });

        setIsConfirm(!isConfirm);
      } else {
        alert("???????????? ?????? ????????? ???????????? ????????????! ????");
      }
    });
  }

  // ???????????? ?????? (??????????????? ??????)
  function onClickAskCancelShare() {
    getShareReturnState(roomId).then((res) => {
      // ?????? ????????? ??? ????????? ?????? ?????? ??????????????? ????????????
      if (res != "true") {
        setIsShareCancelAsk(!isShareCancelAsk);
      } else {
        alert("?????? ?????? ????????? ???????????????.");
      }
    });
  }

  // ?????? ?????? (???????????? ??????)
  function onClickCancelShare() {
    getShareReturnState(roomId).then((res) => {
      // ?????? ????????? ??? ????????? ?????? ?????? ????????? ????????????
      if (res != "true") {
        setIsShareCancel(!isShareCancel);
      } else {
        alert("?????? ????????? ???????????????.");
      }
    });
  }

  // ?????? ?????? (???????????? ??????)
  function onClickCheckReturn() {
    // ???????????? ?????? ????????? ?????? ???????????? ??????
    getShareReturnState(roomId).then((res) => {
      if (res == "true") {
        alert("?????? ?????? ????????? ?????????. ????");
      } else {
        setIsProductReturn(!isProductReturn);
      }
    });
  }

  // ?????? ?????? (??????????????? ??????)
  function onClickEndShare() {
    // ???????????? ?????? ????????? ???????????? ??????
    getShareReturnState(roomId).then((res) => {
      if (res == "true") {
        // ????????? ????????? ???????????? ??? ?????????
        setIsShareComplete(!isShareComplete);
        setIsChatEnd(true);
      } else {
        alert("??????????????? ????????? ?????? ??????????????????. ?????????????????? ?????? ?????? ????????? ????????????. ????");
      }
    });
  }

  // StompREalTime.jsx?????? ???????????? share state??? ??????
  function receiveShareState(state) {
    setShareState(state);
  }

  // StompREalTime.jsx?????? ???????????? room state??? ??????
  function receiveRoomState(state) {
    setRoomState(state);
  }

  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    if (loginUserId) {
      getUserDetail(loginUserId)
        .then((res) => {
          setMyPoint(res.point);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    // boardId ??????
    getBoardIdByRoomId(roomId)
      .then((res) => {
        res = res[0];

        setBoardId(res.boardId);
        setBoardType(res.type);
        setRoomState(res.state);

        // ?????????????????? ????????????
        if (loginUserId == res.shareUserId) {
          setOtherUserId(res.notShareUserId);
          setShareUserId(loginUserId);
          setNotShareUserId(parseInt(res.notShareUserId));
        }
        // ?????????????????? ???????????????
        else if (loginUserId == res.notShareUserId) {
          setOtherUserId(res.shareUserId);
          setShareUserId(res.shareUserId);
          setNotShareUserId(parseInt(loginUserId));
        } else {
          alert("???????????? ????????? ??? ?????????.");
          navigate(`/`);
          return null;
        }

        if (loginUserId == res.shareUserId || loginUserId == res.notShareUserId) {
          setIsAuthorized(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // ??? ???????????? ?????? ?????? ??????
    getChattingRoomState(parseInt(roomId)).then((res) => {
      if (res) {
        res = res[0];

        // ?????? ??? ??????
        if (res == null) {
          setShareState(-3);
        } else if (res.status == 0) {
          setShareState(0);
        } else if (res.status == -1) {
          setShareState(-1);
        } else if (res.status == -2) {
          setShareState(-2);
        }
      }
    });
  }, [roomId]);

  useEffect(() => {
    if (otherUserId) {
      // ????????? nickname ??????
      getUserDetail(otherUserId).then((res) => {
        setBoardDetail((prev) => {
          return {
            ...prev,
            otherUserNickname: res.nickName,
          };
        });
      });
    }
  }, [otherUserId]);

  useEffect(() => {
    if ((boardId, boardType)) {
      // ???????????? ???????????? ??????
      boardType === 1
        ? // ?????????
          getAskArticleDetailByBoardId(boardId)
            .then((res) => {
              res = res[0];

              setBoardDetail((prev) => {
                return {
                  ...prev,
                  thumbnailImage: res.list[0],
                  title: res.title,
                  location: res.address,
                  startDay: res.startDay,
                  endDay: res.endDay,
                  bookmarkCnt: res.bookmarkCnt,
                };
              });
            })
            .catch((error) => {
              console.log(error);
            })
        : // ?????????
          getShareArticleByBoardId(boardId)
            .then((res) => {
              res = res[0];

              setBoardDetail((prev) => {
                return {
                  ...prev,
                  thumbnailImage: res.list[0],
                  title: res.title,
                  location: res.address,
                  startDay: res.startDay,
                  endDay: res.endDay,
                  bookmarkCnt: res.bookmarkCnt,
                };
              });
            })
            .catch((error) => {
              console.log(error);
            });
    }
  }, [boardId, boardType]);

  useEffect(() => {
    if (boardId && boardType && shareUserId && notShareUserId) {
      // recoil??? ?????? ??????????????? ????????? ??????
      setShareData((prev) => {
        return {
          ...prev,
          boardId: boardId,
          boardType: boardType,
          shareUserId: shareUserId,
          notShareUserId: notShareUserId,
        };
      });
    }
  }, [boardId, boardType, shareUserId, notShareUserId]);

  return (
    <div css={wrapper}>
      {isAuthorized ? (
        <div>
          <div css={articleInfoWrapper}>
            <h2>{boardDetail.otherUserNickname} ????????? ??????</h2>
            <ProductInfo infos={boardDetail} boardId={boardId} boardType={boardType} />
          </div>
          <div css={mapAndChatWrapper}>
            {boardId && boardType && otherUserId && boardDetail.otherUserNickname && (
              <StompRealTime
                roomId={roomId}
                boardId={boardId}
                boardType={boardType}
                otherUserId={otherUserId}
                otherUserNickname={boardDetail.otherUserNickname}
                shareUserId={shareUserId}
                notShareUserId={notShareUserId}
                shareState={shareState}
                roomState={roomState}
                sendShareState={receiveShareState}
                isChatEnd={isChatEnd}
                sendOtherLeave={receiveOtherLeave}
                sendRoomState={receiveRoomState}
              />
            )}
          </div>
          <div css={buttonWrapper}>
            {/* state : 0 ?????? ???, -1 ?????? ???, -2 ?????? ?????? ???, -3 ?????? ??? */}
            {shareState == 0 && (
              <>
                {loginUserId == notShareUserId ? (
                  <>
                    <MiddleWideButton text={"?????? ??????"} onclick={onClickAskCancelShare} />
                    <MiddleWideButton text={"?????? ??????"} onclick={onClickEndShare} />
                  </>
                ) : (
                  <>
                    <MiddleWideButton text={"?????? ??????"} onclick={onClickCancelShare} />
                    <MiddleWideButton text={"?????? ??????"} onclick={onClickCheckReturn} />
                  </>
                )}
              </>
            )}
            {shareState == -1 && (
              <>
                <MiddleWideButton text={"?????? ?????????"} onclick={onClickQuit} />
              </>
            )}
            {shareState == -2 && (
              <>
                <MiddleWideButton text={"?????? ?????????"} onclick={onClickQuit} />
              </>
            )}
            {shareState == -3 && (
              <>
                <MiddleWideButton text={"?????? ?????????"} onclick={onClickQuit} />
                {loginUserId == notShareUserId ? (
                  <MiddleWideButton text={"?????? ??????"} onclick={onClickConfirm} />
                ) : (
                  <></>
                )}
              </>
            )}
          </div>

          {isConfirm ? (
            <MeetConfirmModal
              close={setIsConfirm}
              openOath={setIsOath}
              otherUserNickname={boardDetail.otherUserNickname}
              confirmedStartDate={confirmedStartDate}
              confirmedEndDate={confirmedEndDate}
            />
          ) : null}
          {isQuit ? <QuitChattingModal close={setIsQuit} roomId={roomId} /> : null}
          {isOath ? (
            <OathModal
              close={setIsOath}
              roomId={roomId}
              readOnly={false}
              sequenceCompleteOpen={setIsSequenceComplete}
            />
          ) : null}
          {isSequenceComplete ? <SequenceCompleteModal close={setIsSequenceComplete} /> : null}
          {isProductReturn ? (
            <ProductReturnModal
              close={setIsProductReturn}
              otherUserNickname={boardDetail.otherUserNickname}
              otherUserId={otherUserId}
              roomId={roomId}
            />
          ) : null}
          {isShareComplete ? (
            <ShareCompleteModal otherUserNickname={boardDetail.otherUserNickname} close={setIsShareComplete} />
          ) : null}
          {isShareCancel ? (
            <ShareCancelModal
              close={setIsShareCancel}
              otherUserNickname={boardDetail.otherUserNickname}
              roomId={roomId}
            />
          ) : null}
          {isShareCancelAsk ? (
            <ShareCancelAskModal
              close={setIsShareCancelAsk}
              otherUserNickname={boardDetail.otherUserNickname}
              roomId={roomId}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const wrapper = css`
  padding: 90px 200px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const articleInfoWrapper = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;

  & > h2 {
    margin-bottom: 30px;
  }
`;

const mapAndChatWrapper = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    width: 30%;
  }
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 80px;
  & > button {
    width: 250px;
  }

  & > button:nth-of-type(1) {
    background-color: #c82333;
  }

  & > button:nth-of-type(2) {
    margin-left: 40px;
  }
`;

export default ProductChatting;
