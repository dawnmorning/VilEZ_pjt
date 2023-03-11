import React from "react";
import { Link } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HiCalendar, HiHeart } from "react-icons/hi";

const MyBoxCardView = ({ title, endDay, startDay, thumbnail, dDay, roomId, bookmarkCnt }) => {
  const endDayDotted = endDay?.slice(0, 4) + "." + endDay?.slice(5, 7) + "." + endDay?.slice(8, 10);
  const startDayDotted = startDay?.slice(0, 4) + "." + startDay?.slice(5, 7) + "." + startDay?.slice(8, 10);

  return (
    <Link
      to={`/product/chat/${roomId}`}
      css={css`
        color: black;
      `}
    >
      <div css={relatedProductWrapper}>
        <div css={thumbnailWrapper}>
          <div>D-{dDay}</div>
          <img src={thumbnail} />
        </div>
        <div css={infoWrapper}>
          <div>
            <span>{title}</span>
          </div>
          <div>
            <small>
              <HiCalendar />
              {startDayDotted} ~ {endDayDotted}
            </small>
            <small>
              <HiHeart />
              {bookmarkCnt}
            </small>
          </div>
        </div>
      </div>
    </Link>
  );
};

const relatedProductWrapper = css`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: aqua;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s;

  :hover {
    transform: scale(1.02) translateY(-4px);
    transition: all 0.3s;
    box-shadow: 0px 10px 4px rgba(0, 0, 0, 0.25);
  }
`;

const thumbnailWrapper = css`
  position: relative;
  height: 170px;
  background: #d9d9d9;
  border-radius: 10px 10px 0 0;

  & > div {
    position: absolute;
    background-color: #66dd9c;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    min-width: 30px;
    padding: 2px 8px;
    text-align: center;
    color: #fff;
  }

  & > img {
    width: 100%;
    height: 170px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }
`;

const infoWrapper = css`
  height: 80px;
  padding: 10px;
  background: #ffffff;
  border-radius: 0 0 10px 10px;

  & span {
    display: block;
    width: calc(100% - 70px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & small {
    color: #8a8a8a;
    font-size: 12px;
  }

  & > div:nth-of-type(1) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 5px;
  }

  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: row;

    & > small {
      margin-right: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;

      & > svg {
        margin-right: 3px;
      }
    }
  }
`;

export default MyBoxCardView;
