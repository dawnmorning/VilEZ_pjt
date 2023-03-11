import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TbMoodSmile } from "react-icons/tb";
import { getAppointmentsWithinAWeek } from "../../api/appointment";
import ProfileDdaySlide from "./ProfileDdaySlide";

const ProfileDday = () => {
  const userId = window.localStorage.getItem("id");
  const [appointmentsWithinAWeek, setAppointmentsWithinAWeek] = useState([]);
  useEffect(() => {
    getAppointmentsWithinAWeek(userId).then((response) => {
      if (response) {
        setAppointmentsWithinAWeek(response);
        // console.log(response);
      }
    });
  }, []);
  return (
    <div css={ddayWrapper}>
      <div>
        {appointmentsWithinAWeek && appointmentsWithinAWeek.length > 0 ? (
          <ProfileDdaySlide ddaySlideList={appointmentsWithinAWeek} />
        ) : (
          <div css={noItem}>
            <TbMoodSmile size={"34"} color={"#66dd9c"} />
            <div>현재 대여 예정인 물품이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

const ddayWrapper = css`
  position: relative;
  height: 60%;
`;

const noItem = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 180px;
  /* background-color: antiquewhite; */
  > div {
    padding-top: 10px;
    color: #8a8a8a;
  }
`;

export default ProfileDday;
