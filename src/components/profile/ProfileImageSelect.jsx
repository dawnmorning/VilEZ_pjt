import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import { AiOutlineClose } from "react-icons/ai";
import SmallWideButton from "../button/SmallWideButton";
import DefaultProfile from "../../assets/images/default_profile.png";
import editIcon from "../../assets/images/edit_icon.png";

const ProductImageSelect = ({ sendImageList, userProfileImage }) => {
  const [imageList, setImageList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  function onClickFileUpload() {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  }
  function onChangeImage(e) {
    if (!e.target.files) {
      e.preventDefault();
      return;
    }
    setImageList([e.target.files]);
  }
  function onClickDeleteImage() {
    setImageList(DefaultProfile);
    setImageUrl(DefaultProfile);
  }
  function readImage(event) {
    // 인풋 태그에 파일이 있는 경우
    if (event.target.files && event.target.files[0]) {
      // FileReader 인스턴스 생성
      const reader = new FileReader();
      // 이미지가 로드가 된 경우
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      // reader가 이미지 읽도록 하기
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  useEffect(() => {
    sendImageList(imageList[0]);
  }, [imageList]);
  useEffect(() => {
    setImageUrl(userProfileImage);
  }, [userProfileImage]);
  return (
    <div css={imageWrapper}>
      <input
        type="file"
        id="file-input"
        accept=".jpg,.jpeg,.png"
        onChange={(event) => {
          onChangeImage(event), readImage(event);
        }}
      />
      <div onClick={onClickFileUpload}>
        <div>
          <img src={imageUrl} alt="프로필 사진" />
        </div>
        <div>
          <img src={editIcon} alt="프로필 수정" />
        </div>
      </div>
      <div>
        <SmallWideButton text="사진 초기화" onclick={onClickDeleteImage} type={"button"} path={"EditProfile"} />
      </div>
    </div>
  );
};

const imageWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 220px;
  margin-top: 10px;
  & > input {
    display: none;
  }

  & > div:nth-of-type(1) {
    // 프사 이미지 wrapper
    position: relative;
    cursor: pointer;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      object-fit: cover;
    }
    & > div:nth-of-type(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      & > img {
        width: 100px;
        height: 100px;
        object-fit: cover;
      }
    }
    & > div:nth-of-type(2) {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      width: 24px;
      bottom: 4px;
      right: 0px;
      border-radius: 100%;
      background-color: #fff;
      & > img {
        width: 110%;
        height: 110%;
        filter: invert(60%);
      }
    }
  }

  & > div:nth-of-type(2) > button {
    width: 100px;
    background: #fc0101;
  }
`;

export default ProductImageSelect;
