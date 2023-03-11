import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SmallWideButton from "../button/SmallWideButton";

const SequenceCompleteModal = ({ close }) => {
  return (
    <div css={topWrap}>
      <div css={sequenceWrap}>
        <div>예약이 확정되었어요😁</div>
        <div>
          <SmallWideButton
            text="확인"
            onclick={() => {
              close(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const topWrap = css`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const sequenceWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  width: 500px;
  height: 220px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  overflow-y: scroll;
  font-size: 20px;
`;

export default SequenceCompleteModal;
