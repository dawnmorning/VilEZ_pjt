import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MyBoxHeader from "./MyBoxHeader";
import MyBoxBody from "./MyBoxBody";

const MyBoxMain = () => {
  return (
    <div css={mainWrapper}>
      <div>
        <h2>나의 공유박스</h2>
      </div>
      <MyBoxHeader />
      <MyBoxBody />
    </div>
  );
};

const mainWrapper = css`
  padding: 30px 0;

  > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > h2 {
      padding-bottom: 10px;
    }

    & > div {
      width: 140px;
      display: flex;
      align-items: center;
    }
  }
`;

export default MyBoxMain;
