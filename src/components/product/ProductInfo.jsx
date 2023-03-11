import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HiLocationMarker, HiCalendar, HiHeart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ infos, boardId, boardType }) => {
  const navigate = useNavigate();

  function onClickMoveArticle() {
    boardType === 1 ? navigate(`/product/detail/ask/${boardId}`) : navigate(`/product/detail/share/${boardId}`);
  }

  return (
    <div css={productInfoWrapper}>
      <div>
        <img src={infos.thumbnailImage.path} alt="물품 대표사진" />
      </div>
      <div>
        <div>
          <h3>{infos.title}</h3>
          <span onClick={onClickMoveArticle}>글 보러가기</span>
        </div>
        <span>
          <HiLocationMarker /> {infos.location}
        </span>
        <span>
          <HiCalendar /> {infos.startDay} - {infos.endDay}
        </span>
        <span>
          <HiHeart /> {infos.bookmarkCnt}
        </span>
      </div>
    </div>
  );
};

const productInfoWrapper = css`
  display: flex;
  flex-direction: row;

  & > div:nth-of-type(1) {
    width: 275px;
    height: 165px;
    margin-right: 25px;
    border: 1px solid #e1e2e3;
    border-radius: 15px;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      overflow: hidden;
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      margin-bottom: 20px;

      & > h3 {
        margin-right: 15px;
      }

      & > span {
        color: #8a8a8a;
        cursor: pointer;
      }
    }

    & > span {
      margin-bottom: 15px;
      color: #aeaeae;
      display: flex;
      flex-direction: row;
      align-items: center;

      & > svg {
        margin-right: 8px;
      }
    }
  }
`;

export default ProductInfo;
