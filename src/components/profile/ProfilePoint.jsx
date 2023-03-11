import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RiInformationLine } from "react-icons/ri";

const ProfilePoint = (props) => {
  function onMouseOverToolTip() {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = 1;
  }

  function onMouseOutToolTip() {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = 0;
  }

  return (
    <div css={ddayWrapper}>
      <div>
        <div>
          <h4>보유 포인트</h4>
          <div onMouseOver={onMouseOverToolTip} onMouseOut={onMouseOutToolTip}>
            <RiInformationLine size="25" color="#AEAEAE" />
          </div>
          <div id="tooltip" css={tooltipBox}>
            <span>
              공유를 하기 위해 최소 <b>30p</b>가 필요해요 !
            </span>
            <span>
              공유를 하면 <b>30p</b>을 얻을 수 있어요 😀
            </span>
            <span>
              공유를 받으면 <b>30p</b>를 잃어요 😀
            </span>
          </div>
        </div>
        <div css={myPointWrapper}>
          <div> {props.point}</div>
          <span>p</span>
        </div>
      </div>
    </div>
  );
};

const ddayWrapper = css`
  height: 42%;
  border-bottom: 1px solid #d8d8d8;

  & > div {
    padding: 10px;
    display: flex;
    flex-direction: column;

    & > div:nth-of-type(1) {
      display: flex;
      flex-direction: row;
      position: relative;

      & > div:nth-of-type(1) {
        display: flex;
        align-items: center;
      }

      & svg {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

const myPointWrapper = css`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  color: #66dd9c;

  & > span {
    font-size: 34px;
    color: #8a8a8a;
    font-weight: bold;
  }
`;

const tooltipBox = css`
  position: absolute;
  left: 140px;
  top: 0;
  width: 280px;
  height: 110px;
  background-color: #ffffff;
  visibility: hidden;
  z-index: 1;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  border: 3px solid #66dd9c;
  padding: 20px;
  display: flex;
  flex-direction: column;

  & > span {
    font-size: 15px;
    margin-bottom: 20px;
  }
`;

export default ProfilePoint;
