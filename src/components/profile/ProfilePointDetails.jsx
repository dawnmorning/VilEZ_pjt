import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import receiptSide from "../../assets/images/receipt_side.png";
import ProfilePointCategory from "./ProfilePointCategory";

const ProfilePointDetails = ({ data }) => {
  const [pointList, setPointList] = useState([]);
  const [filteredPointList, setFilteredPointList] = useState([]);
  const [category, setCategory] = useState("");

  // 적립 날짜 반대로 정렬하는 함수
  function sortDate(a, b) {
    if (a.pointVO.date > b.pointVO.date) {
      return 1;
    } else if (a.pointVO.date < b.pointVO.date) {
      return -1;
    } else return 0;
  }

  useEffect(() => {
    // getPointListByUserId(userId)
    //   .then((response) => {
    setPointList(data.sort(sortDate));
    setFilteredPointList(data.sort(sortDate));
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }, [data]);

  useEffect(() => {
    if (category === "전체") {
      setFilteredPointList(pointList);
    } else if (category === "적립") {
      setFilteredPointList(pointList.filter((data) => data.pointVO.point > 0));
    } else {
      setFilteredPointList(pointList.filter((data) => data.pointVO.point < 1));
    }
  }, [category]);

  return (
    <div css={pointDetailsWrapper}>
      <div css={receiptBox}>
        <div css={receiptSideBox}></div>
        <h3>
          <span>VilEZ</span> 공유 영수증
        </h3>
        <div css={dropDownWrapper}>
          <ProfilePointCategory setCategory={setCategory} category={category} />
        </div>
        <div css={pointListWrapper}>
          {filteredPointList.length > 0 ? (
            filteredPointList.map((data, index) => (
              <div key={index} css={pointItem}>
                <div>
                  <div>
                    {data.pointVO.date.slice(0, 4)}.{data.pointVO.date.slice(5, 7)}.{data.pointVO.date.slice(8, 10)}
                  </div>
                  <div css={data.pointVO.point > 0 ? greenText : data.pointVO.reason === 2 ? redText : grayText}>
                    {data.pointVO.type === -1
                      ? null
                      : data.pointVO.reason === 0
                      ? data.pointVO.point > 0
                        ? "공유"
                        : "대여"
                      : data.pointVO.reason === 1
                      ? "예약 취소"
                      : "패널티"}
                  </div>
                </div>
                <div>
                  <div>{data.boardInfoVO ? data.boardInfoVO.title : "삭제된 게시글입니다"}</div>
                  <div
                    css={[
                      pointWrapper,
                      data.pointVO.point > 0 ? greenText : data.pointVO.reason === 2 ? redText : grayText,
                    ]}
                  >
                    {data.pointVO.point > 0 ? "+" : null}
                    {data.pointVO.point}p
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div css={pointNull}>포인트 내역이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};
const dropDownWrapper = css`
  display: flex;
  width: calc(100% - 40px);
  justify-content: flex-end;
  margin-top: 10px;
`;
const pointDetailsWrapper = css`
  width: 100%;
  margin-top: 50px;
`;
const receiptBox = css`
  position: relative;
  width: 50%;
  height: 600px;
  margin: 0 auto;
  box-shadow: 0px 10px 5px rgba(0, 0, 0, 0.2);
  & > h3 {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    text-align: center;
    font-size: 26px;
    > span {
      font-size: 26px;
      margin-right: 10px;
      font-weight: bold;
      color: #66dd9c;
    }
  }
`;
const receiptSideBox = css`
  position: absolute;
  right: -50px;
  width: 50px;
  height: 50px;
  background-image: url(${receiptSide});
  background-size: contain;
  background-repeat: no-repeat;
`;
const pointListWrapper = css`
  box-sizing: border-box;
  height: 400px;
  width: calc(100% - 80px);
  margin: 20px auto 0;
  overflow-y: scroll;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const pointItem = css`
  box-sizing: border-box;
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;
  padding: 10px 0;

  & > div {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding: 0 20px;
  }
`;
const redText = css`
  color: #fc0101;
`;
const greenText = css`
  color: #66dd9c;
`;
const grayText = css`
  color: #8a8a8a;
`;
const pointWrapper = css`
  font-size: 36px;
  font-weight: 200;
`;
const pointNull = css`
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 18px;
  color: #c4c4c4;
`;
export default ProfilePointDetails;
