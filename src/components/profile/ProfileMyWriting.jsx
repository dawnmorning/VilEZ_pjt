import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { getUserAsk } from "../../api/ask";
import { getUserShare } from "../../api/share";
import ProfileCardView from "./ProfileCardView";

const ProfileMyWriting = (props) => {
  const userId = window.localStorage.getItem("id");
  const [myBoard, setMyBoard] = useState([]);
  const [myShareBoard, setMyShareBoard] = useState([]);
  const [myAskBoard, setMyAskBoard] = useState([]);
  const [endAxios, setEndAxios] = useState(false);

  useEffect(() => {
    getUserShare(userId).then((response) => {
      if (response) {
        setMyBoard(response);
        setMyShareBoard(response);
      }
      setEndAxios(true);
    });
  }, []);

  useEffect(() => {
    if (endAxios) {
      getUserAsk(userId).then((response) => {
        if (response) {
          setMyAskBoard(response);
        }
      });
    }
  }, [endAxios]);

  useEffect(() => {
    props.setWritingPages(1);
    if (props.myWritingType === 1) {
      setMyBoard(myShareBoard);
    } else {
      setMyBoard(myAskBoard);
    }
  }, [props.myWritingType]);

  useEffect(() => {
    props.setWritingDefaultPages(myBoard ? parseInt((myBoard?.length - 1) / 3) + 1 : 1);
  }, [myBoard]);

  return (
    <div css={cardWrapper(props.writingPages)}>
      {myBoard && myBoard.length > 0 ? (
        myBoard.map((share, idx) => (
          <div key={idx}>
            <ProfileCardView
              title={share.title}
              endDay={share.endDay}
              startDay={share.startDay}
              date={share.date}
              thumbnail={share.list[0]?.path}
              boardType={props.myWritingType === 1 ? "share" : props.myWritingType === 2 ? "ask" : null}
              boardId={share.id}
              bookMarkCnt={share.bookmarkCnt}
            />
          </div>
        ))
      ) : (
        <div css={noCards}>작성한 글이 없습니다.</div>
      )}
    </div>
  );
};

const appear = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  100% {
    display: block;
    opacity: 1;
  }
`;
const cardWrapper = (pages) => {
  const cards = pages * 3;
  return css`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 20px;
    column-gap: 20px;
    height: calc(6px + ${pages}* 274px);
    transition: all 0.5s;
    & > div {
      display: none;
      opacity: 1;
      min-width: 300px;
      transition: all 0.3s;
    }
    & > div:nth-of-type(-n + ${cards}) {
      display: block;
      animation-name: ${appear};
      animation-duration: 0.3s;
      transition: all 0.3s;
    }
  `;
};

const noCards = css`
  position: absolute;
  line-height: 200px;
  height: 200px;
  width: 100%;
  text-align: center;
`;

export default ProfileMyWriting;
