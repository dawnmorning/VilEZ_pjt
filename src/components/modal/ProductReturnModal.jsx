import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MiddleWideButton from "../button/MiddleWideButton";
import { postMannerPoint } from "../../api/user";
import { postShareReturnState } from "../../api/back";
import { useSetRecoilState } from "recoil";
import { checkShareReturnState } from "../../recoil/atom";

const ProductReturnModal = ({ close, otherUserNickname, otherUserId, roomId }) => {
  const setCheckShareReturn = useSetRecoilState(checkShareReturnState);

  const [mannerPoint, setMannerPoint] = useState(2);

  function onClickCloseModal() {
    close(false);
  }

  function onInputMannerPoint(target) {
    const mannerPoint = document.getElementById("mannerPoint");
    mannerPoint.style.width = `${target.value * 10}%`;
  }

  function onChangeMannerPoint(value) {
    value = parseInt(value);
    setMannerPoint(value);
  }

  function onClickReturnConfirm() {
    let degree = 0;

    switch (mannerPoint) {
      case 2:
        degree = 0;
        break;
      case 4:
        degree = 1;
        break;
      case 6:
        degree = 2;
        break;
      case 8:
        degree = 3;
        break;
      case 10:
        degree = 4;
        break;
    }

    postMannerPoint({ degree: degree, userId: otherUserId })
      .then((res) => {
        // 반납 확정
        if (res) {
          postShareReturnState(roomId)
            .then((res) => {
              if (res) {
                alert("물품 반납이 정상적으로 접수되었어요. 🙂");
                setCheckShareReturn(true);
                close(false);
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div css={modalWrapper}>
      <div css={productReturnWrapper}>
        <span>
          <b>{otherUserNickname}</b> 님과의 약속은 만족스러우셨나요?{" "}
        </span>
        <span css={mannerPointWrapper}>
          ★★★★★
          <span id="mannerPoint">★★★★★</span>
          <input
            type="range"
            step="2"
            min="2"
            max="10"
            onInput={(e) => onInputMannerPoint(e.target)}
            onChange={(e) => onChangeMannerPoint(e.target.value)}
          />
        </span>
        <div css={buttonWrap}>
          <MiddleWideButton text={"취소"} cancel={true} onclick={onClickCloseModal} />
          <MiddleWideButton text={"반납 확정"} onclick={onClickReturnConfirm} />
        </div>
      </div>
    </div>
  );
};

const modalWrapper = css`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const productReturnWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 500px;
  height: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
`;

const mannerPointWrapper = css`
  margin: 35px 0;
  position: relative;
  color: #ddd;
  font-size: 35px;

  & > input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }

  & > span {
    width: 0;
    position: absolute;
    left: 0;
    color: #66dd9c;
    overflow: hidden;
    pointer-events: none;
    font-size: 35px;
  }
`;

const buttonWrap = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 350px;

  & > button {
    width: 150px;
  }
`;

export default ProductReturnModal;
