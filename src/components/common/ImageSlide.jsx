import React, { useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";

const ImageSlide = ({ imageSlideList }) => {
  const SIZE = imageSlideList.length;

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
  }, [imageSlideList]);

  return (
    <div css={imageSlideWrapper}>
      {imageSlideList.map((image, index) => (
        <div key={index} css={imageWrapper} className="slide fade">
          <div>{`${index + 1} / ${SIZE}`}</div>
          <div>
            <img src={image.path} />
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
  width: 955px;
  height: 450px;
  position: relative;
  margin: auto;
  border: 1px solid #e1e2e3;
  border-radius: 15px;

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
  height: 100%;

  & > div:nth-of-type(1) {
    color: black;
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    top: 10px;
    left: 20px;
  }

  & > div:nth-of-type(2) {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      width: 900px;
      height: 400px;
      object-fit: contain;
    }
  }
`;

const buttonsWrapper = css`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > button {
    cursor: pointer;
    width: 45px;
    height: 45px;
    color: white;
    transition: 0.5s ease;
    user-select: none;
    border: none;
    opacity: 0.8;
    background-color: #e5e5e5;
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
    margin-left: 20px;
  }

  & > button:nth-of-type(2) {
    right: 0;
    margin-right: 20px;
  }
`;

export default ImageSlide;
