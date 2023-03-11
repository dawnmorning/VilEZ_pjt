import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MiddleWideButton from "../button/MiddleWideButton";
import { GrClose } from "react-icons/gr";
import { ko } from "date-fns/locale";
import { getAppointmentsByBoardId } from "../../api/appointment";
import { useRecoilState, useSetRecoilState } from "recoil";
import { shareDataState, checkShareDateState } from "../../recoil/atom";
import DateFormat from "../common/DateFormat";
import { putShareDate } from "../../api/appointment";
import { getAppointmentDate } from "../../api/appointment";

const CalendarModal = ({ setCalendarModalOpen, boardId, shareState }) => {
  const [shareData, setShareData] = useRecoilState(shareDataState);
  const setCheckShareDate = useSetRecoilState(checkShareDateState);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStartDay, setSelectedStartDay] = useState("");
  const [selectedEndDay, setSelectedEndDay] = useState("");
  const [blockDate, setBlockDate] = useState([]);

  const onChange = (dates) => {
    setSelectedEndDay("");
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  function onClickCloseModal() {
    setCalendarModalOpen(false);
  }

  function onClickMakeMeetDate() {
    if (startDate && endDate) {
      const body = {
        boardId: boardId,
        startDay: DateFormat(new Date(startDate)),
        endDay: DateFormat(new Date(endDate)),
        notShareUserId: shareData.notShareUserId,
        shareUserId: shareData.shareUserId,
        type: shareData.boardType,
      };

      putShareDate(body).then((res) => {
        if (res) {
          alert("공유 기간을 설정했어요. 😀");
          setCheckShareDate(true);
          onClickCloseModal();
        }
      });

      setCalendarModalOpen(false);
    } else {
      alert("기간을 설정해주세요. 😀");
    }
  }

  useEffect(() => {
    getAppointmentsByBoardId(boardId, shareData.boardType).then((res) => {
      // 해당 boardId에 이미 약속 정보가 있다면
      if (res[0].length > 0) {
        for (let appointment of res[0]) {
          let start = appointment.appointmentStart.split("-").map(Number);
          let end = appointment.appointmentEnd.split("-").map(Number);

          const newBlockDate = {
            start: new Date(start[0], start[1] - 1, start[2]),
            end: new Date(end[0], end[1] - 1, end[2]),
          };

          setBlockDate((prev) => [...prev, newBlockDate]);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (shareState != -3) {
      getAppointmentDate(boardId, shareData.notShareUserId, shareData.shareUserId, shareData.boardType).then((res) => {
        if (res) {
          // "yyyy-mm-dd"
          const start = res.appointmentStart;
          const end = res.appointmentEnd;
          setStartDate(new Date(start));
          setEndDate(new Date(end));
        }
      });
    }
  }, [shareState]);

  useEffect(() => {
    if (startDate && endDate && shareState == -3) {
      let flag = false;

      // 기존에 공유중이거나 예약중인 기간 클릭 막기
      if (blockDate.length > 0) {
        for (let date of blockDate) {
          if (startDate <= date.end && date.start <= endDate) {
            flag = true;
            break;
          }
        }
      }

      if (!flag) {
        setSelectedStartDay(DateFormat(startDate));
        setSelectedEndDay(DateFormat(endDate));
      } else {
        setStartDate(null);
        setEndDate(null);
      }

      // recoil에 현재 예약하려는 데이터 담기
      setShareData((prev) => {
        return {
          ...prev,
          appointmentStart: DateFormat(new Date(startDate)),
          appointmentEnd: DateFormat(new Date(endDate)),
        };
      });
    }
  }, [startDate, endDate]);

  return (
    <div css={modalWrapper}>
      <div css={calendarModalWrapper}>
        <GrClose onClick={onClickCloseModal} size="20" />
        <h3>희망 공유 기간</h3>
        {shareState == -3 ? (
          <>
            <DatePicker
              locale={ko}
              minDate={new Date()} // 과거 날짜 disable
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              excludeDateIntervals={blockDate}
              selectsRange
              selectsDisabledDaysInRange
              inline
            />
            {selectedStartDay && selectedEndDay ? (
              <span>
                {selectedStartDay} ~ {selectedEndDay}
              </span>
            ) : (
              <small>* 이미 공유중이거나 예약 완료된 기간 외로 설정해주세요.</small>
            )}
            <div css={buttonWrapper}>
              <MiddleWideButton text={"기간 확정"} onclick={onClickMakeMeetDate} />
            </div>
          </>
        ) : (
          <>
            <DatePicker
              locale={ko}
              minDate={new Date()} // 과거 날짜 disable
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              inline
              readOnly
            />
            {startDate && endDate && (
              <span>
                {DateFormat(startDate)} ~ {DateFormat(endDate)}
              </span>
            )}
            <div css={buttonWrapper}>
              <MiddleWideButton text={"확인"} onclick={onClickCloseModal} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const modalWrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const calendarModalWrapper = css`
  width: 380px;
  height: 550px;
  padding: 20px;
  border: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > svg {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  & > h3 {
    margin-bottom: 30px;
  }

  & > span {
    margin-top: 20px;
  }

  & > small {
    margin-top: 20px;
    color: darkgray;
  }

  & > div:nth-of-type(1) {
    & > div {
      border: none;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

      & > div:nth-of-type(2) {
        & > div:nth-of-type(1) {
          background-color: #66dd9c;
          border-bottom: none;

          & > div:nth-of-type(1) {
            color: white;
          }

          & > div:nth-of-type(3) {
            & > div {
              color: white;
            }
          }
        }
      }
    }

    .react-datepicker__day--keyboard-selected,
    .react-datepicker__day--in-range,
    .react-datepicker__day--selected:hover,
    .react-datepicker__day--in-selecting-range:hover,
    .react-datepicker__day--in-range:hover,
    .react-datepicker__month-text--selected:hover,
    .react-datepicker__month-text--in-selecting-range:hover,
    .react-datepicker__month-text--in-range:hover,
    .react-datepicker__quarter-text--selected:hover,
    .react-datepicker__quarter-text--in-selecting-range:hover,
    .react-datepicker__quarter-text--in-range:hover,
    .react-datepicker__year-text--selected:hover,
    .react-datepicker__year-text--in-selecting-range:hover,
    .react-datepicker__year-text--in-range:hover {
      background-color: #66dd9c;
    }
  }
`;

const buttonWrapper = css`
  width: 320px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;

  & > button {
    width: 150px;
  }
`;

export default CalendarModal;
