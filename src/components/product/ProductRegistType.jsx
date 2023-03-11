import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import DivideLine from "./../common/DivideLine";
import { useLocation } from "react-router-dom";

const ProductRegistType = ({ sendRegistType, sendType, path }) => {
  const pathname = useLocation().pathname;
  const type = pathname.includes("share")
    ? "물품 공유 등록"
    : pathname.includes("ask")
    ? "물품 요청 등록"
    : "선택해주세요.";
  const [openRegistType, setOpenRegistType] = useState(false);
  const [registType, setRegistType] = useState(type);

  function onClickOpenRegistType() {
    if (openRegistType) {
      setOpenRegistType(false);
    } else {
      setOpenRegistType(true);
    }
  }

  function onClickRegistType(type) {
    switch (type) {
      case 1:
        setRegistType("물품 공유 등록");
        break;
      case 2:
        setRegistType("물품 요청 등록");
        break;
    }

    setOpenRegistType(false);
  }

  useEffect(() => {
    sendRegistType(registType);
  }, [registType]);

  useEffect(() => {
    if (sendType) {
      setRegistType(sendType);
    }
  }, [sendType]);

  return (
    <div css={registTypeWrapper}>
      <h2>{registType}</h2>
      {path !== "modify" && (
        <button onClick={onClickOpenRegistType}>
          {openRegistType ? <HiChevronUp size="18" /> : <HiChevronDown size="18" />}
        </button>
      )}
      {openRegistType ? (
        <div>
          <span onClick={() => onClickRegistType(1)}>물품 공유 등록</span>
          <DivideLine />
          <span onClick={() => onClickRegistType(2)}>물품 요청 등록</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const registTypeWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  position: relative;

  & > h2 {
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

  & > div {
    position: absolute;
    width: 185px;
    height: 120px;
    top: 52px;
    background: #ffffff;
    border: 1px solid #ededed;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & span {
      margin: 14px 0;
      cursor: pointer;

      &:hover {
        color: #66dd9c;
        font-weight: bold;
      }
    }
  }
`;

export default ProductRegistType;
