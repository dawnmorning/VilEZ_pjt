import React, { useState, useEffect, useRef } from "react";
// import { Animated } from "react-animated-css";
/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import mainarrow from "../assets/images/mainarrow.png";
// import secondbodyimg from "../assets/images/secondbodyimg.png";
// import thirdbodyimg from "../assets/images/thirdbodyimg.png";
// import mapimg from "../assets/images/mapimg.png";
import myLocation from "../assets/images/mylocation.png";
import chatimg from "../assets/images/chatimg.png";
import mapCapture from "../assets/images/map_capture.png";
import signModal from "../assets/images/sign_modal2.gif";
import homeBackground from "../assets/images/home_background.jpg";
import mockUpImage from "../assets/images/mockup3.png";
import backGradient from "../assets/images/back_gradient.png";
import backScroll from "../assets/images/back_scroll.png";
import appQrCode from "../assets/images/app_qr_code.png";

function MainBody({ setScrollRange }) {
  const mainBox = useRef();
  const firstBox = useRef();
  const secondBox = useRef();
  const thirdBox = useRef();
  const [mainHeight, setMainHeight] = useState(0);
  const [firstHeight, setFirstHeight] = useState(0);
  const [secondHeight, setSecondHeight] = useState(0);
  const [thirdHeight, setThirdHeight] = useState(0);
  const [forthHeight, setForthHeight] = useState(0);
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);

  function toNumber(styleText) {
    return Number(styleText.height.slice(0, styleText.height.length - 2));
  }

  useEffect(() => {
    const mainStyle = window.getComputedStyle(mainBox.current);
    const firstStyle = window.getComputedStyle(firstBox.current);
    const secondStyle = window.getComputedStyle(secondBox.current);
    const thirdStyle = window.getComputedStyle(thirdBox.current);
    setMainHeight(toNumber(mainStyle) + 80);
    setFirstHeight(toNumber(mainStyle) + 5000 - 200);
    setSecondHeight(toNumber(mainStyle) + toNumber(firstStyle) + 5000 - 200);
    setThirdHeight(toNumber(mainStyle) + toNumber(firstStyle) + toNumber(secondStyle) + 5000 - 200);
    setForthHeight(
      toNumber(mainStyle) + toNumber(firstStyle) + toNumber(secondStyle) + toNumber(thirdStyle) + 5000 - 200
    );
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  function onClickApp() {
    setIsQrCodeOpen((prev) => !prev);
  }

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > mainHeight + 20 && scrollPosition < mainHeight + 4000) {
      setScrollRange(true);
    } else {
      setScrollRange(false);
    }
  }, [scrollPosition]);

  return (
    <div>
      <div css={FirstBodyWrap} ref={mainBox}>
        <div css={slogan}>
          {/* <div>내 손 안의 작은 선행</div> */}
          <div>쉽게 빌리고 쉽게 빌려주는</div>
          <div>내 손 안의 작은 선행</div>
          <div>
            VilEZ <span>[빌리지]</span>
          </div>
          <div>
            <div css={isQrCodeOpen ? qrCode : appDownload} onClick={onClickApp}>
              {isQrCodeOpen ? (
                <img src={appQrCode} />
              ) : (
                <>
                  앱 다운로드
                  <BsFillArrowDownCircleFill />
                </>
              )}
              <div>
                <div>▶ QR코드를 촬영하면</div>
                <div>앱 다운로드 링크로 연결됩니다.</div>
              </div>
            </div>
          </div>
        </div>
        <div css={mockUp}>
          <img src={mockUpImage} alt="" />
        </div>
        <div css={ArrowBox}>
          <a href="#movebottom">
            <img src={mainarrow} alt="" />
          </a>
        </div>
      </div>
      <div css={blanks}>
        <div
          css={[
            test(scrollPosition),
            scrollPosition > mainHeight - 200 && scrollPosition < firstHeight + 80
              ? fixedStyle
              : scrollPosition > firstHeight + 80 || scrollPosition < mainHeight - 200
              ? hiddenStyle
              : relativeStyle(scrollPosition - mainHeight),
          ]}
        >
          <span>
            WHY <br /> <span>VilEZ</span>?
          </span>
          <div>
            <div>잠깐 필요한 물품이 없어 곤란했던 경험.</div>
            <div>당장 쓰지 않는 물건을 빌려줘서</div>
            <div>이웃이 기뻐하는 모습.</div>
          </div>
          <div>
            <div>이 모습을 경험한다면 어떻게 될까요?</div>
            <div>이웃끼리 따뜻함도 공유되지 않을까요?</div>
          </div>
          <div>
            <div>빌리지의 이웃들과 함께</div>
            <div>공유하기를 통해 물품을 빌려주고,</div>
            <div>요청하기를 통해 물품을 빌려보세요.</div>
          </div>
        </div>
        <a id="movebottom"></a>
      </div>
      <div css={stepBar}>
        <div css={scrollPosition > firstHeight ? hiddenBox : visibleBox}>VilEZ 이용하기</div>
        <div>
          <div css={scrollPosition > firstHeight ? lightOn : lightOff}>1</div>
          <span></span>
          <div css={scrollPosition > secondHeight + 40 ? lightOn : lightOff}>2</div>
          <span></span>
          <div css={scrollPosition > thirdHeight + 80 ? lightOn : lightOff}>3</div>
          <span></span>
          <div css={scrollPosition > forthHeight + 120 ? lightOn : lightOff}>4</div>
        </div>
      </div>
      <div css={[FirstWrap, scrollPosition > firstHeight ? visibleBox : hiddenBox]} ref={firstBox}>
        <div css={ExplainLeft}>
          <img css={mapCapture} src={myLocation} alt="" />
        </div>
        <div css={ExplainRight}>
          <div css={ExplainTitle}>위치 기반 서비스</div>
          <div css={ExplainContent}>GPS 기반 위치 인증을 통해 </div>
          <div css={ExplainContent}>내 주변에 있는 이웃들의</div>
          <div css={ExplainContent}>공유 물품을 한 눈에 볼 수 있어요.</div>
        </div>
      </div>
      <div css={[ExplainWrap, scrollPosition > secondHeight ? visibleBox : hiddenBox]} ref={secondBox}>
        <div css={[ExplainLeft, ExplainLeftCenter]}>
          <div css={ExplainTitle}>이웃과 실시간 채팅</div>
          <div css={ExplainContent}>게시글로 물품 상태를 확인하고</div>
          <div css={ExplainContent}>이웃과의 실시간 채팅을 통해</div>
          <div css={ExplainContent}>공유 약속을 잡을 수 있어요.</div>
        </div>
        <div css={ExplainRight}>
          <img css={ImgHeight} src={chatimg} alt="" />
        </div>
      </div>
      <div css={[thirdWrap, scrollPosition > thirdHeight ? visibleBox : hiddenBox]} ref={thirdBox}>
        <div css={ExplainLeft}>
          <img src={mapCapture} alt="" />
        </div>
        <div css={ExplainRight}>
          <div css={ExplainTitle}>실시간 공유 지도</div>
          <div css={ExplainContent}>만남 장소를 선정할 때 어려웠던 경험,</div>
          <div css={ExplainContent}>실시간 공유 지도를 사용해</div>
          <div css={ExplainContent}>편하게 선택할 수 있도록 빌리지가 도와줄게요.</div>
        </div>
      </div>
      <div css={[ExplainWrap, scrollPosition > forthHeight ? visibleBox : hiddenBox]}>
        <div css={[ExplainLeft, ExplainLeftCenter]}>
          <div css={ExplainTitle}>안전한 공유방식</div>
          <div css={ExplainContent}>빌리지만의 공유 방식을 통해</div>
          <div css={ExplainContent}>내 물품을 안전하게 공유할 수 있어요.</div>
        </div>
        <div css={ExplainRight}>
          <img css={ImgHeight} src={signModal} alt="" />
        </div>
      </div>
    </div>
  );
}

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const FirstBodyWrap = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh);
  /* background-image: linear-gradient(90deg, #66dd9c50, #66dd9c50, #66dd9c90); */
  background-image: url(${backGradient});
  overflow-x: hidden;
  background-size: cover;
  background-position: center center;
`;

const slogan = css`
  box-sizing: border-box;
  width: 50%;
  font-size: 50px;
  color: #000;
  padding-left: 120px;
  & > div:nth-of-type(-n + 3) {
    opacity: 0;
    font-family: "GmarketSansMedium";
    animation-name: ${appear};
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
  }
  & > div:nth-of-type(1) {
    font-size: 24px;
  }
  & > div:nth-of-type(2) {
    font-size: 42px;
    letter-spacing: -3px;
    animation-delay: 0.4s;
  }
  & > div:nth-of-type(3) {
    font-family: "Pretendard-Black";
    font-weight: 900;
    font-size: 170px;
    color: #66dd9c;
    animation-delay: 0.9s;
    & > span {
      display: inline-block;
      transform: translateX(-20px);
      width: fit-content;
      color: #888;
      font-size: 24px;
      font-family: "GmarketSansMedium";
    }
  }
`;

const mockUp = css`
  width: 40%;
  > img {
    width: 150%;
    height: 100%;
    object-fit: contain;
  }
`;

const floating = keyframes`
  0% {
      transform: translateY(0);
  }
  50% {
      transform: translateY(-15px);
  }
  100% {
      transform: translateY(0);
  }
`;

const ArrowBox = css`
  position: absolute;
  left: calc(50% - 40px);
  bottom: 0;
  width: 80px;
  text-align: center;
  margin-top: 100px;
  cursor: pointer;
  animation: slideInDown;
  animation: ${floating} 2s ease infinite;
  & img {
    width: 100%;
    object-fit: contain;
  }
`;

const FirstWrap = css`
  display: flex;
  padding: 40px 200px;
  justify-content: space-between;
`;

// SecondBody

const stepBar = css`
  box-sizing: border-box;
  height: 140px;
  padding-bottom: 20px;
  /* background-color: #fff; */
  /* background-color: #66dd9c; */
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  & > div:nth-of-type(1) {
    height: 20%;
    line-height: 20%;
    text-align: center;
    font-size: 26px;
    font-family: "GmarketSansMedium";
  }
  & > div:nth-of-type(2) {
    width: 600px;
    height: 40%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    & > div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      border: 1px solid #d8d8d8;
    }
    & > span {
      box-sizing: border-box;
      height: 1px;
      background-color: #d8d8d8;
      width: calc(480px / 3);
      transform: translateY(-15px);
    }
  }
`;

const lightOn = css`
  background-color: #66dd9c;
  color: #fff;
`;

const lightOff = css`
  background-color: #fff;
  color: #000;
`;

const ExplainWrap = css`
  display: flex;
  padding: 40px 200px;
  justify-content: space-between;
  height: calc(100vh - 140px);
  font-family: "GmarketSansMedium";
  background-color: #66dd9c30;
  & img {
    background-color: #fff;
  }
`;

const ExplainRight = css`
  /* background-color: antiquewhite; */
  box-sizing: border-box;
  padding-left: 50px;
  /* border: 1px solid #444; */
  width: 50%;
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "GmarketSansMedium";
`;

const ExplainLeft = css`
  box-sizing: border-box;
  /* border: 1px solid orange; */
  width: 50%;
  padding-right: 50px;
  height: calc(100vh - 140px);
  font-family: "GmarketSansMedium";
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ExplainLeftCenter = css`
  justify-content: center;
  flex-direction: column;
  text-align: right;
  font-family: "GmarketSansMedium";
`;

const ExplainTitle = css`
  font-size: 40px;
  color: #66dd9c;
  margin-bottom: 20px;
  font-family: "GmarketSansBold";
`;

const ExplainContent = css`
  font-size: 24px;
  height: 26px;
  padding-bottom: 20px;
  font-family: "GmarketSansMedium";
`;

const ImgHeight = css`
  width: 80%;
  max-height: 90%;
  object-fit: contain;
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
`;

const thirdWrap = css`
  display: flex;
  padding: 40px 200px;
  justify-content: space-between;
  height: 600px;
`;

const hiddenBox = css`
  opacity: 0;
  transition: all 1s;
  transform: translateY(40px);
`;
const visibleBox = css`
  opacity: 1;
  transition: all 1s;
  transform: translateY(0px);
`;

const blanks = css`
  height: 5000px;
  background-image: url(${backScroll});
  background-size: 100% 100%;
`;

const test = (scroll) => {
  return css`
    /* position: relative; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    background-image: url(${homeBackground});
    background-size: cover;
    opacity: ${(scroll / 5 - 130) / 100};
    > span {
      position: absolute;
      top: 100px;
      left: 100px;
      font-size: 120px;
      color: #fff;
      font-family: "Pretendard-Black";
      line-height: 120px;
      > span {
        font-size: 120px;
        color: #66dd9c;
        font-family: "Pretendard-Black";
        line-height: 120px;
      }
    }
    > div {
      position: relative;
      width: 100%;
      height: calc(100vh / 5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 30px;
      font-weight: bold;
    }
    ::before {
      position: absolute;
      display: block;
      content: "";
      background-color: rgba(0, 0, 0, 0.8);
      opacity: ${(scroll / 5 - 300) / 100};
      width: 100%;
      height: 100vh;
      z-index: 2;
    }
    ::after {
      position: absolute;
      display: block;
      content: "";
      background-color: #fff;
      opacity: ${(scroll / 5 - 900) / 100};
      width: 100%;
      height: 100vh;
      z-index: 5;
    }
    > div:nth-of-type(1) {
      opacity: ${(scroll / 5 - 400) / 100};
      z-index: 3;
    }
    > div:nth-of-type(2) {
      opacity: ${(scroll / 5 - 550) / 100};
      z-index: 3;
    }
    > div:nth-of-type(3) {
      opacity: ${(scroll / 5 - 700) / 100};
      z-index: 3;
    }
  `;
};

const fixedStyle = css`
  position: sticky;
  top: 0;
`;
const relativeStyle = (scroll) => {
  return css`
    position: fixed;
    bottom: ${scroll - 1200};
    bottom: 0;
  `;
};

const hiddenStyle = css`
  visibility: hidden;
`;

const appDownload = css`
  position: relative;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  font-family: "GmarketSansMedium";
  font-size: 16px;
  height: 45px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  > * {
    margin-left: 10px;
  }
  :hover {
    background-color: rgba(255, 255, 255, 0.6);
    > * {
      transform: translateY(4px);
    }
  }
  > div {
    position: absolute;
    visibility: hidden;
    display: block;
    width: 300px;
    left: 190px;
    bottom: 10px;
    font-family: "GmarketSansMedium";
    > div {
      font-size: 16px;
      font-family: "GmarketSansMedium";
    }
    > div:nth-of-type(2) {
      padding-left: 18px;
    }
  }
`;

const qrCode = css`
  position: relative;
  height: 180px;
  transition: all 0.3s;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  font-family: "GmarketSansMedium";
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  > img {
    width: 90%;
  }
  > div {
    width: 300px;
    visibility: visible;
    position: absolute;
    opacity: 1;
    left: 190px;
    bottom: 10px;
    display: block;
    font-size: 16px;
    font-family: "GmarketSansMedium";
    > div {
      font-size: 16px;
      font-family: "GmarketSansMedium";
    }
    > div:nth-of-type(2) {
      padding-left: 18px;
    }
  }
`;

export default MainBody;
