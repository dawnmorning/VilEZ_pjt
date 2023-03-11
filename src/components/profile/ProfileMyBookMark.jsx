import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { getUserBookMark } from "../../api/share";
import ProfileCardView from "./ProfileCardView";

const ProfileMyBookMark = (props) => {
  const userId = localStorage.getItem("id");
  const [myBookMarkBoard, setMyBookMarkBoard] = useState([]);
  useEffect(() => {
    getUserBookMark(userId).then((response) => {
      if (response) {
        setMyBookMarkBoard(response);
        props.setBookMarkPages(1);
        props.setBookMarkDefaultPages(response ? parseInt((response.length - 1) / 3) + 1 : 1);
      }
    });
  }, []);
  useEffect(() => {
    props.setBookMarkDefaultPages(myBookMarkBoard ? parseInt((myBookMarkBoard?.length - 1) / 3) + 1 : 1);
  }, [myBookMarkBoard]);
  return (
    <div css={cardWrapper(props.bookMarkPages)}>
      {myBookMarkBoard && myBookMarkBoard.length > 0 ? (
        myBookMarkBoard.map((bookMarkData, idx) => {
          return (
            <div key={idx}>
              <ProfileCardView
                title={bookMarkData.shareListDto.title}
                endDay={bookMarkData.shareListDto.endDay}
                startDay={bookMarkData.shareListDto.startDay}
                date={bookMarkData.shareListDto.date}
                thumbnail={bookMarkData.shareListDto.list[0]?.path}
                boardType={"share"}
                boardId={bookMarkData.shareListDto.id}
                bookMarkCnt={bookMarkData.shareListDto.bookmarkCnt}
              />
            </div>
          );
        })
      ) : (
        <div css={noCards}>관심글이 없습니다.</div>
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
  height: 200px;
  line-height: 200px;
  width: 100%;
  text-align: center;
`;

export default ProfileMyBookMark;
