import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MannerPoint from "./../common/MannerPoint";

const ProfileSummary = (props) => {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (props.manner > 40) {
      setLevel(5);
    } else {
      const calLevel = parseInt((props.manner - 1) / 10) + 1;
      setLevel(calLevel);
    }
  }, [props.manner]);

  return (
    <div css={summaryWrapper}>
      <div css={summaryBox}>
        <div css={profilePicture({ profileImage: props.profileImage })}>
          {/* <img src={props.profileImage} alt="하잉" /> */}
        </div>
        <h3
          css={css`
            height: 46px;
          `}
        >
          {props.nickName}
        </h3>
        <div css={mannerWrapper}>
          <div>
            <div>Lv.{level}</div>
            <img src={MannerPoint(props.manner)} />
          </div>
          <div css={mannerBox}>{props.manner}</div>
        </div>
        <div css={gaugeBar}>
          <div css={bar({ manner: props.manner })}></div>
        </div>
      </div>
    </div>
  );
};

const summaryWrapper = css`
  width: 28%;
  height: 100%;
  border-right: 1px solid #d8d8d8;
`;
const summaryBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 160px;
  margin: 0 auto;
`;

const profilePicture = (props) =>
  css`
    width: 120px;
    height: 120px;
    margin-bottom: 10px;
    background-image: url(${props.profileImage});
    background-size: cover;
    background-position: center center;
    border-radius: 50%;
  `;
const mannerWrapper = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;

  & > div:nth-of-type(1) {
    display: flex;
    flex-direction: row;
  }

  & img {
    width: 25px;
    height: 25px;
    margin-left: 5px;
  }
`;
const mannerBox = css`
  border-radius: 30px;
  border: 1px solid #66dd9c;
  padding: 0 12px;
  line-height: 20px;
  color: #66dd9c;
`;
const gaugeBar = css`
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: #e8e8e8;
  overflow: hidden;
`;
const bar = (props) => css`
  width: ${props.manner % 10 === 0 ? 100 : (props.manner % 10) * 10}%;
  height: 10px;
  background-color: #66dd9c;
`;

export default ProfileSummary;
