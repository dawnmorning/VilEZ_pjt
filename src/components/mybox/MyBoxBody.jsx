import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MyBoxShare from "./MyBoxShare";
import MyBoxRent from "./MyBoxRent";
import { useEffect } from "react";

const MyBoxBody = () => {
  const [section, setSection] = useState("");
  const [myShareType, setMyShareType] = useState(1);
  const [myRentType, setMyRentType] = useState(1);
  const [shareDefaultPages, setShareDefaultPages] = useState(1);
  const [rentDefaultPages, setRentDefaultPages] = useState(1);
  const [sharePages, setSharePages] = useState(1);
  const [rentPages, setRentPages] = useState(1);

  function onClickChangeShareType(value) {
    if (value === 2) {
      setMyShareType(2);
    } else {
      setMyShareType(1);
    }
  }

  function onClickChangeRentType(value) {
    if (value === 2) {
      setMyRentType(2);
    } else {
      setMyRentType(1);
    }
  }

  function onClickShareMore() {
    if (shareDefaultPages > sharePages) {
      setSharePages((prev) => prev + 1);
    } else {
      setSharePages(1);
    }
    setSection("share");
  }

  function onClickRentMore() {
    if (rentDefaultPages > rentPages) {
      setRentPages((prev) => prev + 1);
    } else {
      setRentPages(1);
    }
    setSection("product");
  }

  useEffect(() => {
    if (section === "share") {
      setRentPages(1);
    } else if (section === "product") {
      setSharePages(1);
    }
  }, [section]);

  return (
    <div>
      <div css={sectionWrapper}>
        <div>
          <h3>나의 공유 물품</h3>
          <div>
            <button
              css={myShareType === 1 ? basic : bordered}
              onClick={() => {
                onClickChangeShareType(1);
              }}
            >
              공유 중
            </button>
            <button
              css={myShareType === 2 ? basic : bordered}
              onClick={() => {
                onClickChangeShareType(2);
              }}
            >
              공유 예정
            </button>
          </div>
        </div>
        <MyBoxShare
          section={section}
          sharePages={sharePages}
          setSharePages={setSharePages}
          setShareDefaultPages={setShareDefaultPages}
          myShareType={myShareType}
        />
        {shareDefaultPages === 1 ? null : sharePages === shareDefaultPages ? (
          <button onClick={onClickShareMore} css={moreWrapper}>
            접기
          </button>
        ) : (
          <button onClick={onClickShareMore} css={moreWrapper}>
            더보기 {sharePages} / {shareDefaultPages}
          </button>
        )}
      </div>
      <div css={sectionWrapper}>
        <div>
          <h3>나의 대여 물품</h3>
          <div>
            <button
              css={myRentType === 1 ? basic : bordered}
              onClick={() => {
                onClickChangeRentType(1);
              }}
            >
              대여 중
            </button>
            <button
              css={myRentType === 2 ? basic : bordered}
              onClick={() => {
                onClickChangeRentType(2);
              }}
            >
              대여 예정
            </button>
          </div>
        </div>
        <MyBoxRent
          section={section}
          rentPages={rentPages}
          setRentPages={setRentPages}
          setRentDefaultPages={setRentDefaultPages}
          myRentType={myRentType}
        />
        {rentDefaultPages === 1 ? null : rentPages === rentDefaultPages ? (
          <button onClick={onClickRentMore} css={moreWrapper}>
            접기
          </button>
        ) : (
          <button onClick={onClickRentMore} css={moreWrapper}>
            더보기 {rentPages} / {rentDefaultPages}
          </button>
        )}
      </div>
    </div>
  );
};

const sectionWrapper = css`
  padding: 50px 0;

  & > div:nth-of-type(1) {
    height: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div {
      width: 210px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > button {
        cursor: pointer;
        border: 1px solid #66dd9c;
        border-radius: 15px;
        width: 100px;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
`;

const basic = css`
  background-color: #66dd9c;
  color: #fff;
`;

const bordered = css`
  background-color: #fff;
  color: #66dd9c;
  :hover {
    background-color: #acf0cb32;
  }
`;

const moreWrapper = css`
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  line-height: 40px;
  width: 100%;
  margin-top: 30px;
`;

export default MyBoxBody;
