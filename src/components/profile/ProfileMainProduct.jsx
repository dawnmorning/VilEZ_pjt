import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ProfileMyWriting from "./ProfileMyWriting";
import ProfileMyBookMark from "./ProfileMyBookMark";
import { useEffect } from "react";

// const id = localStorage.getItem("id");
const ProfileMainProduct = () => {
  const [section, setSection] = useState("");
  const [myWritingType, setMyWritingType] = useState(1);
  const [writingDefaultPages, setWritingDefaultPages] = useState(1);
  const [bookMarkDefaultPages, setBookMarkDefaultPages] = useState(1);
  const [writingPages, setWritingPages] = useState(1);
  const [bookMarkPages, setBookMarkPages] = useState(1);
  function onClickChangeType(value) {
    if (value === 2) {
      setMyWritingType(2);
    } else {
      setMyWritingType(1);
    }
  }
  function onClickWritingMore() {
    if (writingDefaultPages > writingPages) {
      setWritingPages((prev) => prev + 1);
    } else {
      setWritingPages(1);
    }
    setSection("writing");
  }
  function onClickBookMarkMore() {
    if (bookMarkDefaultPages > bookMarkPages) {
      setBookMarkPages((prev) => prev + 1);
    } else {
      setBookMarkPages(1);
    }
    setSection("product");
  }
  useEffect(() => {
    if (section === "writing") {
      setBookMarkPages(1);
    } else if (section === "product") {
      setWritingPages(1);
    }
  }, [section]);
  return (
    <div>
      <div css={sectionWrapper}>
        <div>
          <h3>나의 작성글</h3>
          <div>
            <button
              css={myWritingType === 1 ? basic : bordered}
              onClick={() => {
                onClickChangeType(1);
              }}
            >
              나의 공유글
            </button>
            <button
              css={myWritingType === 2 ? basic : bordered}
              onClick={() => {
                onClickChangeType(2);
              }}
            >
              나의 요청글
            </button>
          </div>
        </div>
        <ProfileMyWriting
          section={section}
          writingPages={writingPages}
          setWritingPages={setWritingPages}
          setWritingDefaultPages={setWritingDefaultPages}
          myWritingType={myWritingType}
        />
        {writingDefaultPages === 1 ? null : writingPages === writingDefaultPages ? (
          <button onClick={onClickBookMarkMore} css={moreWrapper}>
            접기
          </button>
        ) : (
          <button onClick={onClickWritingMore} css={moreWrapper}>
            더보기 {writingPages} / {writingDefaultPages}
          </button>
        )}
      </div>
      <div css={sectionWrapper}>
        <div>
          <h3>나의 관심글</h3>
        </div>
        <ProfileMyBookMark
          section={section}
          bookMarkPages={bookMarkPages}
          setBookMarkPages={setBookMarkPages}
          setBookMarkDefaultPages={setBookMarkDefaultPages}
        />
        {bookMarkDefaultPages === 1 ? null : bookMarkPages === bookMarkDefaultPages ? (
          <button onClick={onClickBookMarkMore} css={moreWrapper}>
            접기
          </button>
        ) : (
          <button onClick={onClickBookMarkMore} css={moreWrapper}>
            더보기 {bookMarkPages} / {bookMarkDefaultPages}
          </button>
        )}
      </div>
    </div>
  );
};

const sectionWrapper = css`
  padding: 30px 0;
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

export default ProfileMainProduct;
