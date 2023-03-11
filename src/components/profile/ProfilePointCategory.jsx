import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HiChevronUp, HiChevronDown } from "react-icons/hi2";

const ProfilePointCategory = ({ setCategory, category }) => {
  const categoryType = ["전체", "적립", "차감"];
  const [openCategory, setOpenCategory] = useState(false);
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
    setCategory("전체");
  }, []);

  return (
    <div css={categoryWrapper}>
      <span>{category}</span>
      <button onClick={onClickOpenCategory}>
        {openCategory ? <HiChevronUp size="18" /> : <HiChevronDown size="18" />}
      </button>
      {openCategory ? (
        <div css={categoryTypeWrapper}>
          {categoryType.map((category, index) => (
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
  position: relative;
  display: flex;
  flex-direction: row;
  border: 1px solid #ededed;
  border-radius: 5px;
  width: 100px;
  height: 35px;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  position: relative;
  & > span {
    width: 100%;
    padding-left: 20px;
    position: absolute;
    font-weight: bold;
    font-size: 14px;
  }

  & > button {
    position: absolute;
    right: 4px;
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background: #ffffff;
    /* box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25); */
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const categoryTypeWrapper = css`
  position: absolute;
  width: 100px;
  /* height: 300px; */
  left: 0px;
  top: 35px;
  background: #ffffff;
  border: 1px solid #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  & > span {
    display: block;
    width: 100%;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    padding-left: 10px;
    font-size: 14px;
    &:hover {
      color: #66dd9c;
      font-weight: bold;
    }
  }
`;

export default ProfilePointCategory;
