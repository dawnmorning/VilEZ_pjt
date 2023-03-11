import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HiLocationMarker, HiCalendar, HiHeart } from "react-icons/hi";
import image from "../../assets/images/product_thumbnail.png";

const ProductCardView = () => {
  return (
    <div css={relatedProductWrapper}>
      <div css={thumbnailWrapper}>
        <img src={image} />
      </div>
      <div css={infoWrapper}>
        <div>
          <span>맥북 에어 M1 공유해요</span>
          <small>1시간 전</small>
        </div>
        <div>
          <small>
            <HiLocationMarker />
            진평동
          </small>
          <small>
            <HiCalendar />
            2023.01.23 ~ 2023.02.22
          </small>
          <small>
            <HiHeart />
            25
          </small>
        </div>
      </div>
    </div>
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
`;

const thumbnailWrapper = css`
  height: 170px;
  background: #d9d9d9;
  border-radius: 10px 10px 0 0;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }
`;

const infoWrapper = css`
  height: 80px;
  padding: 10px;
  background: #ffffff;
  border-radius: 0 0 10px 10px;

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

export default ProductCardView;
