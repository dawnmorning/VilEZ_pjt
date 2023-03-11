import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import MyBoxCardView2 from "./MyBoxCardView2";
import { getMyRentAppointments } from "../../api/appointment";
import MyBoxDDay from "./MyBoxDDay";

const MyBoxRent = (props) => {
  const userId = window.localStorage.getItem("id");
  const [myBoard, setMyBoard] = useState([]);
  const [myBeingRentedBoard, setMyBeingRentedBoard] = useState([]);
  const [myToBeRentedBoard, setMyToBeRentedBoard] = useState([]);

  useEffect(() => {
    getMyRentAppointments(userId).then((response) => {
      setMyBoard(response.filter((res) => MyBoxDDay(res.myAppointListVO.appointmentStart) <= 0));
      setMyBeingRentedBoard(response.filter((res) => MyBoxDDay(res.myAppointListVO.appointmentStart) <= 0));
      setMyToBeRentedBoard(response.filter((res) => MyBoxDDay(res.myAppointListVO.appointmentStart) > 0));
    });
  }, []);

  useEffect(() => {
    props.setRentPages(1);
    if (props.myRentType === 1) {
      setMyBoard(myBeingRentedBoard);
    } else {
      setMyBoard(myToBeRentedBoard);
    }
  }, [props.myRentType]);

  useEffect(() => {
    props.setRentDefaultPages(parseInt((myBoard?.length - 1) / 3) + 1);
  }, [myBoard]);

  return (
    <div css={cardWrapper(props.rentPages)}>
      {myBoard?.length > 0 ? (
        myBoard.map((rent, idx) => (
          <div key={idx}>
            <MyBoxCardView2
              title={rent.myAppointListVO.title}
              type={rent.myAppointListVO.type}
              startDay={rent.myAppointListVO.appointmentStart}
              endDay={rent.myAppointListVO.appointmentEnd}
              date={rent.myAppointListVO.date}
              roomId={rent.myAppointListVO.roomId}
              thumbnail={rent.imgPathList[0].path}
              dDay={
                props.myRentType === 1
                  ? MyBoxDDay(rent.myAppointListVO.appointmentEnd)
                  : MyBoxDDay(rent.myAppointListVO.appointmentStart)
              }
              bookmarkCnt={rent.bookmarkCnt}
            />
          </div>
        ))
      ) : props.myRentType === 1 ? (
        <div css={noCards}>현재 대여중인 물품이 없습니다.</div>
      ) : (
        <div css={noCards}>대여 예정인 물품이 없습니다.</div>
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

export default MyBoxRent;
