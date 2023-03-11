import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import { keyframes } from "@emotion/react";
// import homeBackground from "../assets/images/home_background_2.jpg";

const Home2 = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);
  return (
    <div css={homeWrapper}>
      <div css={scrollWrapper(scrollPosition)}>
        <div>
          <div>
            <div>쉽게 빌리고</div>
            <div>쉽게 빌려주는</div>
            <div>공유마을, 빌리지.</div>
            <div></div>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div css={expWrapper}></div>
    </div>
  );
};

const homeWrapper = css``;
const scrollWrapper = (scroll) => {
  return css`
    top: 0;
    height: 5000px;
    background-color: aquamarine;
    & > div {
      position: sticky;
      top: 0;
      height: 100vh;
      background-color: black;
      opacity: ${scroll / 5000 + 0.5};
      & > div:nth-of-type(1) {
        height: 100vh;
        font-size: 100px;
        background-color: antiquewhite;
      }
      & > div:nth-of-type(2) {
      }
      & > div:nth-of-type(3) {
      }
      & > div:nth-of-type(4) {
      }
    }
  `;
};

const expWrapper = css``;

export default Home2;
