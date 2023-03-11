import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DivideLine from "../../components/common/DivideLine";
import ProductCategory from "./ProductCategory";
import { useState, useEffect } from "react";
import NoProductList from "./NoProductList";
import { getShareArticleList } from "../../api/share";
import { HiCalendar } from "react-icons/hi";
import { HiHeart } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { getAskArticleList } from "../../api/ask";
import elapsedTime from "./ProductElapsedTime";
import MiddleWideButton from "./../button/MiddleWideButton";

const ProductList = () => {
  const userId = window.localStorage.getItem("id");
  const [isAll, setIsAll] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [getArticle, setArticles] = useState([]); // 공유 글
  const [askArticles, setAskArticles] = useState([]); // 요청 글

  // 무한 스크롤 관련 변수. cnt가 페이지번호를 담당, 일정 기준 이상 스크롤시 cnt 증가, 페이지 숫자가 증가하는 것
  const [cnt, setCnt] = useState(0);
  const [currentTab, setCurrentTab] = useState(null);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const urlId = pathname.includes("share") ? 2 : 1;
  const [list, setList] = useState("");
  const categoryToUse = category === "전체" ? "" : category;
  // location 이라는 선언변수가 있었음
  const location = { areaLat: localStorage.getItem("areaLat"), areaLng: localStorage.getItem("areaLng") };
  // 무한 스크롤 관련
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;

      if (scrollTop + clientHeight >= scrollHeight && getArticle.length) {
        setCnt(cnt + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cnt, getArticle, search]);

  // 카테고리 변경 후 스크롤을 내렸다가 ,다른 카테고리를 선택했을 때 이전 카테고리 데이터가 쌓여 나옴
  // 네비게이션 바에서 공유 -> 요청 혹은 요청 -> 공유로 갔을 때 setCnt가 작동해야하는데, 하지 않아서
  // 또 다른 변수가 변할 때 setCnt(0)으로 작동하게 하였음.
  useEffect(() => {
    setCnt(0);
    window.scrollTo(0, 0);
  }, [currentTab]);

  useEffect(() => {
    if (currentTab !== urlId) {
      setCurrentTab(urlId);
      setArticles([]);
      setAskArticles([]);
      setCnt(0);
    }
  }, [urlId, search]);

  useEffect(() => {
    if (isAll) {
      if (urlId === 1) {
        getAskArticleList(location.areaLat, location.areaLng, categoryToUse, cnt, 15, 0, userId, search).then((res) => {
          const data = res[0];
          setAskArticles([...askArticles, ...data]);
          setList("물품 요청 목록");
        });
      } else {
        getShareArticleList(location.areaLat, location.areaLng, categoryToUse, cnt, 15, 0, userId, search).then(
          (res) => {
            const data = res;
            setArticles([...getArticle, ...data]);
            setList("물품 공유 목록");
          }
        );
      }
    } else {
      if (urlId === 1) {
        getAskArticleList(location.areaLat, location.areaLng, categoryToUse, cnt, 15, 0, userId, search).then((res) => {
          const data = res[0].filter((article) => article.askDto && article.askDto.state === 0);
          setAskArticles([...askArticles, ...data]);
          setList("물품 요청 목록");
        });
      } else {
        getShareArticleList(location.areaLat, location.areaLng, categoryToUse, cnt, 15, 0, userId, search).then(
          (res) => {
            const data = res.filter((article) => article.shareListDto && article.shareListDto.state === 0);
            setArticles([...getArticle, ...data]);
            setList("물품 공유 목록");
          }
        );
      }
    }
  }, [urlId, isAll, cnt, categoryToUse]);

  function onClickSeePossible() {
    setIsAll(!isAll);
    setCnt(0);
    setArticles([]);
    setAskArticles([]);
  }

  // props에서 받아온 값이 newCategory에 들어감
  // setCategory에 넘어온 값을 입력
  function receiveCategory(newCategory) {
    setCategory(newCategory);
    setCnt(0);
    setArticles([]);
    setAskArticles([]);
  }

  const allowedCharsRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣 ]*$/;

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (!allowedCharsRegex.test(inputValue)) {
      alert("특수문자는 입력할 수 없어요");
      return;
    }
    setSearch(inputValue);
  };

  // 검색 후, 지웠을 때 이전 검색이 리스트에 쌓이는 것을 방지
  // 스크롤이 내려가서 cnt가 변했을 때, 검색을 하면 그 페이지를 기준으로 해서 문제를 해결함
  function onChangeSearch(e) {
    if (e.keyCode === 13) {
      setArticles([]);
      setAskArticles([]);
      // setOriginalArticle([]);
      setCnt(0);

      urlId === 2
        ? getShareArticleList(location.areaLat, location.areaLng, categoryToUse, cnt, 15, 0, userId, search).then(
            (res) => {
              const data = res;
              setArticles(data);
              setList("물품 공유 목록");
            }
          )
        : getAskArticleList(location.areaLat, location.areaLng, categoryToUse, cnt, 15, 0, userId, search).then(
            (res) => {
              const data = res[0];
              setAskArticles(data);
              setList("물품 요청 목록");
            }
          );

      setSearch("");
    }
  }

  function onClicktoRegist() {
    navigate("/product/regist", { state: { type: urlId } });
  }

  return (
    <div css={topWrap}>
      <div>
        <div css={listWrap}>
          <h2>{list}</h2>
          <div css={buttonDiv}>
            <MiddleWideButton text={"물품 등록"} onclick={onClicktoRegist} />
          </div>
        </div>
        <div css={filterWrap}>
          <div css={filterLeftWrap}>
            <ProductCategory isMain={false} sendCategory={receiveCategory} list={true} />
          </div>
          <div css={filterRighWrap}>
            <div css={searchWrap}>
              <input
                css={MainInputBox}
                placeholder="필요한 물품을 검색해보세요"
                type="text"
                value={search}
                onChange={handleChange}
                onKeyDown={(e) => onChangeSearch(e)}
              />
              <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" />
            </div>
            {isAll ? (
              <div onClick={onClickSeePossible} css={possibleWrap}>
                공유가능한 물품만 보기
              </div>
            ) : (
              <div onClick={onClickSeePossible} css={unPossibleWrap}>
                공유가능한 물품만 보기
              </div>
            )}
          </div>
        </div>
        <DivideLine />

        {urlId === 2 ? (
          <div css={relatedProductWrapper}>
            {getArticle.map((article, idx) => (
              <div key={idx} onClick={() => navigate(`/product/detail/share/${article.shareListDto.id}`)}>
                <div css={thumbnailWrapper}>
                  {article.shareListDto?.state === 0 ? (
                    <div css={badgeGreen}>공유가능</div>
                  ) : (
                    <div css={badgeGray}>공유중</div>
                  )}
                  <img src={article.shareListDto?.list[0]?.path} />
                </div>
                <div css={infoWrapper}>
                  <div>
                    <span>{article.shareListDto?.title}</span>
                    <small>{elapsedTime(article.shareListDto?.date)}</small>
                  </div>
                  <div>
                    <small>
                      <HiCalendar />
                      {article?.shareListDto?.startDay} ~ {article?.shareListDto?.endDay}
                    </small>
                    <small>
                      <HiHeart />
                      {article?.listCnt}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div css={relatedProductWrapper}>
            {askArticles.map((article, idx) => (
              <div key={idx} onClick={() => navigate(`/product/detail/ask/${article.askDto.id}`)}>
                <div css={thumbnailWrapper}>
                  {article.askDto?.state === 0 ? (
                    <div css={badgeGreen}>공유가능</div>
                  ) : (
                    <div css={badgeGray}>공유중</div>
                  )}
                  <img src={article?.askDto?.list[0]?.path} />
                </div>
                <div css={infoWrapper}>
                  <div>
                    <span>{article?.askDto?.title}</span>
                    <small>{elapsedTime(article.askDto?.date)}</small>
                  </div>
                  <div>
                    <small>
                      <HiCalendar />
                      {article?.askDto?.startDay} ~ {article?.askDto?.endDay}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div css={NoProductWrap}>
        <NoProductList />
      </div>
    </div>
  );
};

const topWrap = css`
  padding-left: 200px;
  padding-right: 200px;
  margin-top: 70px;
  height: 100%;
`;

const listWrap = css`
  display: flex;
  align-items: center;
  justify-content: space-between !important;
  width: 100%;

  & h2:nth-of-type(1) {
    width: 60%;
  }
`;

const buttonDiv = css`
  display: flex;
  width: 150px;
  float: right;
  height: 30%;
  margin-bottom: 20px;
`;

const filterWrap = css`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  position: relative;
`;

const filterLeftWrap = css`
  font-size: 25px;
  display: flex;
  z-index: 20;
`;

const filterRighWrap = css`
  display: flex;
  width: 60%;
  justify-content: right;
  align-items: center;
`;

const MainInputBox = css`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 35px;
  border: 1px solid #e1e2e3;
  border-radius: 5px;
  font-size: 15px;
  background-color: #ffffff;
  outline: none;
  padding: 0 20px;

  & ::placeholder {
    color: #c4c4c4;
  }
`;

const searchWrap = css`
  width: 50%;
  padding: 1px;
  position: relative;

  & > img {
    position: absolute;
    width: 14px;
    top: 12px;
    left: 6px;
  }
`;

const possibleWrap = css`
  margin-left: 15px;
  cursor: pointer;
`;

const unPossibleWrap = css`
  margin-left: 15px;
  color: #66dd9c;
  cursor: pointer;
  font-weight: bold;
  box-sizing: border-box;
  background-color: white;
`;

const relatedProductWrapper = css`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  height: 100%;
  margin-right: 50px;
  border-radius: 10px;
  cursor: pointer;

  & > div {
    margin-bottom: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
`;

const thumbnailWrapper = css`
  position: relative;
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

const badgeGreen = css`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0 8px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: #66dd9c;
  border-radius: 4px;
  text-align: center;
`;

const badgeGray = css`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0 8px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #8a8a8a;
  background-color: #e8e8e8;
  border-radius: 4px;
  text-align: center;
`;

const infoWrapper = css`
  max-height: 80px;
  padding: 10px;
  background: #ffffff;
  border-radius: 0 0 10px 10px;

  & small {
    color: #8a8a8a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > div:nth-of-type(1) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 5px;
  }

  & > div:nth-of-type(1) span {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
    white-space: nowrap;
    width: 100%;
    font-weight: 100;
  }

  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    margin-top: 10px;

    & > div:nth-of-type(2) span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }

    & > small {
      margin-right: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      & > svg {
        margin-right: 3px;
      }
    }
  }
`;

const NoProductWrap = css`
  margin: 100px 0;
`;

export default ProductList;
