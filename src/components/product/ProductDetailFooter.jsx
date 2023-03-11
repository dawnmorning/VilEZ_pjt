import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HiChevronRight } from "react-icons/hi2";
import { useLocation } from "react-router-dom";

const ProductDetailFooter = () => {
  const location = useLocation();

  async function onClickShareArticle(url) {
    try {
      await navigator.clipboard.writeText(url);

      alert("링크를 클립보드에 복사했어요.");
    } catch (error) {
      console.log(error);
    }
  }

  function onClickMoveToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div css={menusWrapper}>
      <div onClick={() => onClickShareArticle(`https://i8d111.p.ssafy.io${location.pathname}`)}>
        <span>이 게시물 공유하기</span>
        <HiChevronRight size="22" />
      </div>
      <div onClick={onClickMoveToTop}>
        <span>맨 위로 이동하기</span>
        <HiChevronRight size="22" />
      </div>
    </div>
  );
};

const menusWrapper = css`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  & > div {
    width: 180px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin: 20px 0;
  }
`;

export default ProductDetailFooter;
