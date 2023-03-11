import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import bookmark from "../../assets/images/bookmark.png";
import { Link, useLocation, useParams } from "react-router-dom";
import { getShareArticleByBoardId } from "../../api/share";
import { getAskArticleDetailByBoardId } from "../../api/ask";

const ProductDeatilHeader = ({ title, category, time, bookmarkCount, isShowDelete }) => {
  const userId = window.localStorage.getItem("id");
  const [thisboardUserId, setThisboardUserId] = useState(null);

  const pathname = useLocation().pathname;
  const boardId = parseInt(useParams().boardId);
  const type = pathname.includes("share") ? 2 : 1;

  useEffect(() => {
    type === 2
      ? getShareArticleByBoardId(boardId).then((res) => {
          setThisboardUserId(res[0].userId);
        })
      : getAskArticleDetailByBoardId(boardId).then((res) => {
          setThisboardUserId(res[0].userId);
        });
  }, []);

  function onClickshowDeleteModal() {
    isShowDelete(true);
  }

  return (
    <div css={headerWrapper}>
      <div css={headerLeftSectionWrapper}>
        <span>{title}</span>
        <span>{category}</span>
        <small>{time}</small>
      </div>
      <div css={headerRightSectionWrapper}>
        {/* Link로 변경 */}
        {type === 1 ? (
          parseInt(userId) === parseInt(thisboardUserId) ? (
            <div>
              <Link to={"/product/list/ask"}>
                <span css={optionWrap}>목록</span>
              </Link>
              <Link to={`/product/edit/ask/${boardId}`}>
                <span css={optionWrap}>수정</span>
              </Link>
              <span css={optionWrap} onClick={onClickshowDeleteModal}>
                삭제
              </span>
            </div>
          ) : (
            <Link to={"/product/list/ask"}>
              <span css={optionWrap}>목록</span>
            </Link>
          )
        ) : parseInt(userId) === parseInt(thisboardUserId) ? (
          <div>
            <Link to={"/product/list/share"}>
              <span css={optionWrap}>목록</span>
            </Link>
            <Link to={`/product/edit/share/${boardId}`}>
              <span css={optionWrap}>수정</span>
            </Link>
            <span css={optionWrap} onClick={onClickshowDeleteModal}>
              삭제
            </span>
          </div>
        ) : (
          <Link to={"/product/list/share"}>
            <span css={optionWrap}>목록</span>
          </Link>
        )}
        {type === 2 ? (
          <div>
            <img src={bookmark} alt="bookmark" />
            <small>{bookmarkCount}</small>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const headerWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 5px;
`;

const headerLeftSectionWrapper = css`
  & > span:nth-of-type(1) {
    /* span태그 주의 */
    display: block;
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    margin-right: 20px;
    padding-bottom: 15px;
  }

  & > span:nth-of-type(2) {
    color: #66dd9c;
    font-weight: bold;
    margin-right: 20px;
  }

  & > small {
    color: #8a8a8a;
  }
`;

const headerRightSectionWrapper = css`
  display: flex;
  flex-direction: row-reverse;
  width: 30%;

  & > span {
    color: #8a8a8a;
    cursor: pointer;
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    & img {
      margin-left: 20px;
      margin-right: 5px;
      width: 25px;
      height: 20px;
    }
  }
`;

const optionWrap = css`
  margin-left: 15px;
  color: black;
  cursor: pointer;
`;

export default ProductDeatilHeader;
