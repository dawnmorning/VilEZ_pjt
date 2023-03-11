import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";

const ProductCategory = ({ isMain, sendCategory, list, defaultCategory }) => {
  const categoryType = [
    "화장품/미용",
    "생활/건강",
    "식품",
    "스포츠/레저",
    "가구/인테리어",
    "디지털/가전",
    "출산/육아",
    "패션잡화",
    "여가/생활편의",
    "패션의류",
    "도서",
    "기타",
  ];
  const categoryTypeList = [
    "전체",
    "화장품/미용",
    "생활/건강",
    "식품",
    "스포츠/레저",
    "가구/인테리어",
    "디지털/가전",
    "출산/육아",
    "패션잡화",
    "여가/생활편의",
    "패션의류",
    "도서",
    "기타",
  ];

  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState("");
  function onClickOpenCategory() {
    if (openCategory) {
      setOpenCategory(false);
    } else {
      setOpenCategory(true);
    }
  }

  function onClickCategoryType(type) {
    setCategory(type);
    setOpenCategory(false);
  }

  useEffect(() => {
    sendCategory(category);
  }, [category]);

  return (
    <div css={isMain ? categoryWrapper : noBorder}>
      <span>{defaultCategory}</span>
      <button onClick={onClickOpenCategory}>
        {openCategory ? <HiChevronLeft size="18" /> : <HiChevronRight size="18" />}
      </button>
      {openCategory ? (
        <div css={isMain ? categoryTypeWrapper : categoryTypeModifyWrapper}>
          {list
            ? categoryTypeList.map((category, index) => (
                <span key={index} onClick={() => onClickCategoryType(category)}>
                  {category}
                </span>
              ))
            : categoryType.map((category, index) => (
                <span key={index} onClick={() => onClickCategoryType(category)}>
                  {category}
                </span>
              ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const categoryWrapper = css`
  display: flex;
  flex-direction: row;
  border: 1px solid #ededed;
  border-radius: 5px;
  width: 200px;
  height: 55px;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  position: relative;

  & > span {
    font-weight: bold;
    color: #66dd9c;
    margin-right: 20px;
  }

  & > button {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const noBorder = css`
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  width: 200px;
  height: 55px;
  align-items: center;
  background: #ffffff;
  position: relative;

  & > span {
    font-weight: bold;
    color: #66dd9c;
    margin-right: 10px;
  }

  & > button {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const categoryTypeWrapper = css`
  position: absolute;
  width: 158px;
  height: 300px;
  left: 210px;
  top: 0px;
  background: #ffffff;
  border: 1px solid #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: #c4c4c4;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  & > span {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    text-align: center;

    &:hover {
      color: #66dd9c;
      font-weight: bold;
    }
  }
`;

const categoryTypeModifyWrapper = css`
  position: absolute;
  width: 158px;
  height: 300px;
  left: 130px;
  top: 0px;
  background: #ffffff;
  border: 1px solid #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: #c4c4c4;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  & > span {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    text-align: center;

    &:hover {
      color: #66dd9c;
      font-weight: bold;
    }
  }
`;

export default ProductCategory;
