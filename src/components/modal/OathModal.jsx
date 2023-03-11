import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SignatureCanvas from "react-signature-canvas";
import { postOath } from "../../api/oath";
import MiddleWideButton from "../button/MiddleWideButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { shareDataState, checkAppointmentState } from "../../recoil/atom";
import { getUserDetail } from "../../api/user";

function OathModal({ close, roomId, readOnly, oathSign, sequenceCompleteOpen }) {
  const canvasRef = useRef(null);
  const shareData = useRecoilValue(shareDataState);
  const setCheckAppointment = useSetRecoilState(checkAppointmentState);

  const [giver, setGiver] = useState("");
  const [receiver, setReceiver] = useState("");
  const [isSign, setIsSign] = useState(false);
  const [isCanvasAccept, setIsCanvasAccept] = useState(false);
  const [flag, setFlag] = useState(false);

  function onClickNo() {
    close(false);
  }

  function onClickCanvas() {
    const canvas = canvasRef.current.getTrimmedCanvas().toDataURL("image/png");

    postOath({
      roomId: roomId,
      sign: canvas,
    })
      .then((res) => {
        if (res) {
          setIsCanvasAccept(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserDetail(parseInt(shareData.shareUserId)).then((res) => {
      setGiver(res.nickName);
      setFlag(true);
    });
  }, [shareData.shareUserId]);

  useEffect(() => {
    if (flag) {
      getUserDetail(shareData.notShareUserId).then((res) => {
        setReceiver(res.nickName);
      });
    }
  }, [shareData.notShareUserId, flag]);

  useEffect(() => {
    // 서명이 서버로 전송되고 나면 약속 확정
    if (isCanvasAccept) {
      setCheckAppointment(true);
      close(false);
      sequenceCompleteOpen(true);
    }
  }, [isCanvasAccept]);

  // 확정 버튼 누르면 서버로 전송할 api
  return (
    <div css={topWrap}>
      {!readOnly ? (
        <div css={oathWrap}>
          <h3>서약서</h3>
          {giver && receiver ? (
            <div css={oathContentWrap}>
              <span>
                피공유자 <strong>{receiver}</strong>는 공유자 <strong>{giver}</strong>에게 물품을
              </span>
              <span>빌리며, {receiver}는 분실, 도난 기타 등의 이유로</span>
              <span>물품의 원래 형태로 복구가 불가능할 경우</span>
              <span>
                <b>민사, 형사상의 책임을 질 수 있음</b>을 확인합니다.
              </span>
            </div>
          ) : (
            <></>
          )}
          <div css={signWrap}>
            {!isSign && <div css={signContentWrap}>여기에 서명을 해주세요</div>}
            <div css={canvasWrapper}>
              <SignatureCanvas
                ref={canvasRef}
                backgroundColor="#ffffff"
                canvasProps={{ width: 400, height: 200 }}
                onBegin={() => {
                  setIsSign(true);
                }}
              />
            </div>
            <div>
              <button
                css={oathButton}
                onClick={() => {
                  canvasRef.current.clear();
                  setIsSign(false);
                }}
              >
                다시 쓸래요
              </button>
            </div>
          </div>
          <small>상기 내용을 모두 이해하고, 동의하시면 확정을 눌러주세요</small>
          <div css={buttonWrap}>
            <MiddleWideButton text={"아니오"} onclick={onClickNo} cancel={true} />
            <MiddleWideButton text={"예약 확정"} onclick={onClickCanvas} />
          </div>
        </div>
      ) : (
        <div css={oathReadOnlyWrap}>
          <h3>서약서</h3>
          {giver && receiver ? (
            <div css={oathContentWrap}>
              <span>
                피공유자 <strong>{receiver}</strong>는 공유자 <strong>{giver}</strong>에게 물품을
              </span>
              <span>빌리며, {receiver}는 분실, 도난 기타 등의 이유로</span>
              <span>물품의 원래 형태로 복구가 불가능할 경우</span>
              <span>
                <b>민사, 형사상의 책임을 질 수 있음</b>을 확인합니다.
              </span>
            </div>
          ) : (
            <></>
          )}
          <div css={canvasWrapper}>
            <img css={signImage} src={oathSign} />
          </div>
          <div css={buttonReadOnlyWrap}>
            <MiddleWideButton text={"닫기"} onclick={onClickNo} />
          </div>
        </div>
      )}
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

const oathWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 500px;
  height: 720px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  overflow-y: scroll;

  & > h3 {
    margin-top: 30px;
  }

  & > small {
    font-weight: bold;
    margin-bottom: 25px;
  }
`;

const oathReadOnlyWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 500px;
  height: 640px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  overflow-y: scroll;

  & > h3 {
    margin-top: 30px;
  }

  & > small {
    font-weight: bold;
    margin-bottom: 25px;
  }
`;

const oathContentWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 25px;

  & > span {
    margin-bottom: 15px;

    & > b {
      color: #fc0101;
    }
  }
`;

const signWrap = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const canvasWrapper = css`
  border: 1px solid #e1e2e3;
`;

const signImage = css`
  width: 390px;
  height: 190px;
`;

const signContentWrap = css`
  position: absolute;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  font-size: 12px;
`;

const oathButton = css`
  width: 140px;
  height: 50px;
  border-radius: 5px;
  border: gray;
  background-color: white;
  cursor: pointer;
`;

const buttonWrap = css`
  display: flex;
  width: 350px;
  flex-direction: row;
  justify-content: space-between;

  & > button {
    width: 150px;
  }
`;

const buttonReadOnlyWrap = css`
  width: 150px;
  margin-top: 30px;
`;

export default OathModal;
