import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import MiddleWideButton from "./../button/MiddleWideButton";

const NoProductList = () => {
  const navigate = useNavigate();

  function onClicktoRegist() {
    navigate("/product/regist", { state: { type: 1 } });
  }

  return (
    <div css={topWrap}>
      <span>근처에 대여 가능한 물품이 더 없네요.😥</span>
      <span>공유 요청 게시글을 작성해 보는 건 어때요?</span>
      <div>
        <MiddleWideButton text="게시글 작성하기" onclick={onClicktoRegist} />
      </div>
    </div>
  );
};

const topWrap = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    margin-bottom: 20px;
  }

  & > div {
    width: 200px;
  }
`;

export default NoProductList;
