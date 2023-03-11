import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HiLocationMarker, HiCalendar, HiHeart } from "react-icons/hi";
import image from "../../assets/images/mainBackgroundImage.png";
import { getShareArticleList } from "../../api/share";

const ProductListView = () => {
  const [getArticle, setArticles] = useState([]);

  useEffect(() => {
    getShareArticleList("디지털/가전", 0, 100, 0, "").then((res) => {
      const data = res;
      setArticles(data);
    });
  }, []);

  return (
    <div css={relatedProductWrapper}>
      {getArticle.map((article, idx) => (
        <div key={idx} css={topWrap}>
          <div css={thumbnailWrapper}>
            <img src={image} />
          </div>
          <div css={infoWrapper}>
            <div>
              <span>{article.shareListDto.title}</span>
              <small>1시간 전</small>
            </div>
            <div>
              <small>
                <HiLocationMarker />
                {article.shareListDto.area}
              </small>
              <small>
                <HiCalendar />
                {article.shareListDto.startDay} ~ {article.shareListDto.endDay}
              </small>
              <small>
                <HiHeart />
                25
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const relatedProductWrapper = css`
  width: 312px;
  height: 250px;
  margin-right: 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const topWrap = css`
  margin-bottom: 50px;
  height: 100%;
`;

const thumbnailWrapper = css`
  height: 170px;
  background: #d9d9d9;
  border-radius: 10px 10px 0 0;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px 10px 0 0;
  }
`;

const infoWrapper = css`
  max-height: 80px;
  padding: 10px;
  background: #ffffff;
  border-radius: 0 0 10px 10px;

  & small {
    color: #8a8a8a;
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

export default ProductListView;
