import React, { useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import DDay from "./DDay";

const ProfileDdaySlide = ({ ddaySlideList }) => {
  const SIZE = ddaySlideList.length;

  let slideIndex = 0;

  function onClickPrevSlide() {
    showSlides((slideIndex -= 1));
  }

  function onClickNextSlide() {
    showSlides((slideIndex += 1));
  }

  function showSlides(current) {
    // 무한 캐러셀을 위해 양 끝 인덱스 처리
    if (current < 0) slideIndex = SIZE - 1;
    if (current === SIZE) slideIndex = 0;

    let slides = document.querySelectorAll(".slide");

    if (slides) {
      for (let i = 0; i < SIZE; i++) {
        if (i === slideIndex) slides[slideIndex].style.display = "block";
        else slides[i].style.display = "none";
      }
    }
  }

  useEffect(() => {
    showSlides(slideIndex);
  }, [ddaySlideList]);

  return (
    <div css={imageSlideWrapper}>
      {ddaySlideList.map((appoint, index) => (
        <div key={index} css={imageWrapper} className="slide fade">
          <div css={ddayExp}>
            <div css={imgBack(appoint.imgPath[0].path)}>
              <Link to={`/product/chat/${appoint.appointmentDto.roomId}`}>
                <div>채팅으로 이동</div>
              </Link>
            </div>
            <div>
              <div>잊지 마세요</div>
              <div>{appoint.appointmentDto.title}</div>
              <div>
                {appoint.appointmentDto.status === "마감일 임박!" ? "반납까지" : "대여 시작까지"}
                <span
                  css={css`
                    margin: 0 5px;
                  `}
                >
                  {appoint.appointmentDto.status === "마감일 임박!"
                    ? DDay(appoint.appointmentDto.appointmentEnd)
                    : DDay(appoint.appointmentDto.appointmentStart)}
                </span>
                일 남았습니다.
              </div>
            </div>
          </div>
        </div>
      ))}
      <div css={buttonsWrapper}>
        <button onClick={onClickPrevSlide}>
          <HiChevronLeft size="22" />
        </button>
        <button onClick={onClickNextSlide}>
          <HiChevronRight size="22" />
        </button>
      </div>
    </div>
  );
};

const imageSlideWrapper = css`
  height: 180px;
  padding-top: 7px;
  top: 0;
  width: 100%;
  position: relative;
  margin: auto;

  & .fade {
    animation-name: fade;
    animation-duration: 1s;
  }

  @keyframes fade {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
`;

const imageWrapper = css`
  width: 100%;
  position: absolute;
  top: 26px;
  height: 60%;
  justify-content: space-between;
  align-items: center;
`;
const buttonsWrapper = css`
  position: absolute;
  bottom: 20px;
  right: 10px;
  width: 70px;
  display: flex;
  justify-content: space-between;

  & > button {
    cursor: pointer;
    width: 30px;
    height: 30px;
    color: white;
    transition: 0.5s ease;
    user-select: none;
    border: none;
    opacity: 0.8;
    border-radius: 50%;
    margin-top: -25px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #66dd9c;
    }
  }

  & > button:nth-of-type(1) {
    left: 0;
  }

  & > button:nth-of-type(2) {
    right: 0;
  }
`;

const ddayExp = css`
  display: flex;
  justify-content: space-between;
  margin: 0px 10px;
  height: 140px;
  text-align: left;
  // 섹션 타이틀과 제목과 디데이
  & > div:nth-of-type(2) {
    font-size: 16px;
    width: calc(50% - 20px);
    // 섹션 타이틀
    & > div:nth-of-type(1) {
      font-weight: bold;
    }
    // 제목
    & > div:nth-of-type(2) {
      margin-top: 20px;
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      /* font-weight: bold; */
    }
    // 디데이
    & > div:nth-of-type(3) {
      margin-top: 5px;
      & > span {
        font-size: 26px;
      }
    }
  }
`;

const imgBack = (props) => {
  return css`
    cursor: pointer;
    width: 50%;
    overflow: hidden;
    border-radius: 5px;
    background-image: url(${props});
    background-size: cover;
    background-position: center center;
    transition: all 0.3s;

    > a {
      > div {
        opacity: 0;
        background-color: #55cb8a8f;
        color: #fff;
        transition: all 0.3s;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      :hover div {
        opacity: 1;
      }
    }

    /* ::after {
      content: "";
      display: block;
      height: 100%;
      background-color: #66dd9c;
      opacity: 0;
      transition: all 0.3s;
    }

    :hover::after {
      opacity: 0.5;
    } */
  `;
};

export default ProfileDdaySlide;
