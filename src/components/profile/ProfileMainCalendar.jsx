import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ProfileCalendar from "./ProfileCalendar";

const ProfileMainCalander = () => {
  return (
    <div
      css={css`
        padding-top: 30px;
      `}
    >
      <ProfileCalendar />
      {/* <ProfileCalander /> */}
    </div>
  );
};

export default ProfileMainCalander;
