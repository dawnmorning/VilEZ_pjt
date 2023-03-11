import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
// import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { getAppointmentsByUserId } from "../../api/appointment";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div css={headerWrapper}>
      <button onClick={prevMonth}>
        <IoIosArrowBack />
      </button>
      <div>
        <span>{format(currentMonth, "yyyy")}</span>.<span>{format(currentMonth, "M").padStart(2, "0")}</span>
      </div>
      <button onClick={nextMonth}>
        <IoIosArrowForward />
      </button>
      <div css={expWrapper}>
        <div>
          <span></span>
          공유 약속
        </div>
        <div>
          <span></span>대여 약속
        </div>
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(<div key={i}>{date[i]}</div>);
  }

  return <div css={daysWrapper}>{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  // const RenderCells = ({ currentMonth, selectedDate }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const userId = window.localStorage.getItem("id");

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  // appointment 데이터 삽입

  const [appointList, setAppointList] = useState([]);
  function appointmentsStartForDay(day) {
    const filteredAppointments = appointList.filter(
      (appoint) =>
        day.getFullYear() + "-0" + (day.getMonth() + 1) + "-" + day.getDate() === appoint.appointmentStart ||
        day.getFullYear() + "-0" + (day.getMonth() + 1) + "-0" + day.getDate() === appoint.appointmentStart ||
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate() === appoint.appointmentStart ||
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-0" + day.getDate() === appoint.appointmentStart
    );
    return filteredAppointments;
  }
  function appointmentsEndForDay(day) {
    const filteredAppointments = appointList.filter(
      (appoint) =>
        day.getFullYear() + "-0" + (day.getMonth() + 1) + "-" + day.getDate() === appoint.appointmentEnd ||
        day.getFullYear() + "-0" + (day.getMonth() + 1) + "-0" + day.getDate() === appoint.appointmentEnd ||
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate() === appoint.appointmentEnd ||
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-0" + day.getDate() === appoint.appointmentEnd
    );
    return filteredAppointments;
  }
  useEffect(() => {
    getAppointmentsByUserId(userId).then((response) => {
      setAppointList(response[0]);
    });
  }, []);

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div
          css={
            !isSameMonth(day, monthStart)
              ? disabled
              : isSameDay(day, selectedDate)
              ? selected
              : format(currentMonth, "M") !== format(day, "M")
              ? notValid
              : valid
          }
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span css={format(currentMonth, "M") !== format(day, "M") ? notValid : null}>{formattedDate}</span>
          {appointmentsStartForDay(day).map((appoint, idx) => (
            <div key={idx} css={appoint.state === 1 ? shareStartDay : rentStartDay}>
              {appoint.title}
            </div>
          ))}
          {appointmentsEndForDay(day).map((appoint, idx) => (
            <div key={idx} css={appoint.state === 1 ? shareEndDay : rentEndDay}>
              {appoint.title}
            </div>
          ))}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<div key={day}>{days}</div>);
    days = [];
  }
  return <div css={bodyWrapper}>{rows}</div>;
};

const ProfileCalender2 = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // const selectedDate = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };
  return (
    <div css={calendarContainer}>
      <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <RenderDays />
      <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} />
      {/* <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} /> */}
    </div>
  );
};
const calendarContainer = css`
  width: calc(100% - 100px);
  margin: 0 auto;
`;
const headerWrapper = css`
  /* background-color: red; */
  position: relative;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  & > button {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
    width: 30px;
    border: none;
  }
`;
const expWrapper = css`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
    padding: 0 10px;
    & > span {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 8px;
    }
  }
  & > div:nth-of-type(1) > span {
    background-color: #66dd9c68;
  }
  & > div:nth-of-type(2) > span {
    background-color: #8fd2f445;
  }
`;
const daysWrapper = css`
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  display: flex;
  > div {
    width: calc(100% / 7);
  }
`;
const bodyWrapper = css`
  > div {
    display: flex;
    > div {
      // 각 날짜
      width: calc(100% / 7);
      height: 110px;
      border-bottom: 1px solid #e8e8e8;
      cursor: pointer;
      > span {
        padding: 2px 5px;
      }
      > div {
        // 각 일정
        box-sizing: border-box;
        padding: 0 4px;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
      }
    }
  }
`;
// 해당 월의 날짜가 아님
const notValid = css``;
// 해당 월의 날짜가 아님
const disabled = css`
  font-weight: bold;
  background-color: #f9f9f9;
`;
// 오늘 날짜
const selected = css`
  background-color: #65df9c20;
`;
const valid = css`
  background-color: #fff;
`;

const shareStartDay = css`
  background-color: #66dd9c68;
`;
const shareEndDay = css`
  background-color: #66dd9c68;
  /* color: #fff; */
`;
const rentStartDay = css`
  background-color: #8fd2f445;
`;
const rentEndDay = css`
  background-color: #8fd2f445;
  /* color: #fff; */
`;

export default ProfileCalender2;
