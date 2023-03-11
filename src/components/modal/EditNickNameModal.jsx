import React from "react";
// import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineExclamationCircle } from "react-icons/ai";
// import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import ProfileImageSelect from "../profile/ProfileImageSelect";
import { getCheckNickName } from "../../api/user";
import { getUserDetail } from "../../api/user";
import { putUserPasswordNickName, putUserProfileImage } from "../../api/user";
import { useSetRecoilState } from "recoil";
import { loginUserState } from "../../recoil/atom";

function EditNickNameModal({ url }) {
  const userId = window.localStorage.getItem("id");
  const setLoginUser = useSetRecoilState(loginUserState);
  const navigate = useNavigate();

  const [userNickName, setUserNickName] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [nickName, setNickName] = useState("");
  const [nickNameCheck, setNickNameCheck] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [isNickNameOpen, setIsNickNameOpen] = useState(false);

  function onKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  function onChangeNickName(event) {
    setNickName(event.target.value);
    setIsNickNameAvailable(false);
    setNickNameCheck("");
  }

  function onClickNickName() {
    setIsNickNameOpen(true);
  }

  function onClickNickNameCheck() {
    if ((!nickNameError || nickNameError === "중복 확인을 진행해주세요.") && nickName) {
      getCheckNickName(nickName).then((response) => {
        setNickNameError("");
        setNickNameCheck(response.text);
        setIsNickNameAvailable(response.isNickNameAvailable);
      });
    }
  }

  function onClickDeleteNickName() {
    setNickName("");
    setNickNameCheck("");
    setIsNickNameOpen(false);
  }

  function receiveImageList(imageList) {
    setImageList(imageList);
  }

  function onClickCancle() {
    navigate("/");
  }

  function onSubmit() {
    if ((isNickNameAvailable || !isNickNameOpen) && nickName) {
      putUserPasswordNickName(userId, nickName).then((response) => {
        if (response) {
          setLoginUser((prev) => {
            return {
              ...prev,
              nickName: nickName,
            };
          });
          if (imageList) {
            const formData = new FormData();
            formData.append("image", imageList[0]);
            formData.append("userId", new Blob([JSON.stringify(userId)], { type: "application/json" }));
            putUserProfileImage(formData).then((response) => {
              if (!response) {
                return;
              }
            });
          }

          window.localStorage.setItem("nickName", nickName);
          alert("프로필 정보가 변경되었어요.");
          navigate(url);
          return;
        }
      });
    } else if (!isNickNameAvailable) {
      if (nickName && (nickName.length > 6 || !/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣 ]*$/.test(nickName))) {
        setNickNameError("닉네임은 특수문자 제외 최대 6자까지 설정할 수 있어요.");
      } else {
        setNickNameError("중복 확인을 진행해주세요.");
      }
    } else if (!nickName) {
      alert("닉네임을 변경해주시겠어요?");
    }
  }

  useEffect(() => {
    getUserDetail(userId).then((response) => {
      setUserNickName(response.nickName);
      setUserProfileImage(response.profile_img);
    });
  }, []);

  useEffect(() => {
    if (nickName === userNickName && nickName) {
      setNickNameError(`${nickName}"은(는) 현재 닉네임과 동일합니다.`);
    } else if ((nickName && nickName.length > 6) || (nickName && !/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣 ]*$/.test(nickName))) {
      setNickNameError("닉네임은 특수문자 제외 최대 6자까지 설정할 수 있어요.");
    } else {
      setNickNameError("");
    }
  }, [nickName]);

  return (
    <form css={EditProfileBox}>
      <h3>프로필 수정</h3>

      {/* 닉네임 파트 */}
      <div css={firstWrap}>
        <div css={subTitleWrap}>
          <strong>닉네임</strong>
        </div>
        <div css={condition}>2자 이상 6자 이하 영소문자와 숫자로만 작성해주세요</div>
        <div css={doubleCheckBox}>
          <input
            name="nickName"
            type={isNickNameOpen ? "text" : "button"}
            placeholder={isNickNameOpen ? "닉네임을 입력해주세요." : "수정을 원하면 클릭해주세요."}
            css={isNickNameOpen ? inputBox : [inputBox, disabled]}
            onClick={onClickNickName}
            onChange={onChangeNickName}
            onKeyDown={onKeyDown}
            value={isNickNameOpen ? nickName : "수정을 원하면 클릭해주세요."}
          />
          <button
            css={duplicateCheck}
            type="button"
            onClick={() => {
              onClickNickNameCheck();
            }}
          >
            중복확인
          </button>
          <div
            onClick={() => {
              onClickDeleteNickName();
            }}
          >
            {!isNickNameOpen ? null : <IoIosCloseCircle />}
          </div>
        </div>
        {nickNameError ? (
          <small css={errorWrapper({ color: "#fc0101" })}>
            <AiOutlineExclamationCircle size={12} />
            {nickNameError}
          </small>
        ) : null}
        {nickNameCheck ? (
          <small css={errorWrapper({ color: isNickNameAvailable ? "#66dd9c" : "#fc0101" })}>{nickNameCheck}</small>
        ) : null}
      </div>
      {/* 프로필 사진 파트 */}
      <div css={thirdWrap}>
        <div css={subTitleWrap}>
          <strong>프로필 사진</strong>
        </div>
        <ProfileImageSelect sendImageList={receiveImageList} userProfileImage={userProfileImage} />
      </div>
      {/* 취소 / 완료 버튼 */}
      <div css={commitButtonWrapper}>
        <button type="button" onClick={onClickCancle}>
          홈으로 돌아가기
        </button>
        <button type="button" onClick={onSubmit}>
          완료
        </button>
      </div>
    </form>
  );
}

const EditProfileBox = css`
  padding: 50px 40px 30px;
  width: 440px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 1px 1px 2px;
  & > h3 {
    text-align: center;
    padding-bottom: 10px;
  }
`;

const firstWrap = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const subTitleWrap = css`
  font-size: 18px;
  padding-top: 20px;
`;

const condition = css`
  color: #c4c4c4;
  font-size: 12px;
`;

const doubleCheckBox = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & > div {
    position: absolute;
    right: 145px;
    top: 19px;
    cursor: pointer;
  }
`;

const inputBox = css`
  box-sizing: border-box;
  display: block;
  width: calc(100% - 130px);
  height: 45px;
  border: 1px solid #e1e2e3;
  border-radius: 5px;
  font-size: 14px;
  background-color: #ffffff;
  outline: none;
  padding: 0 10px;
  margin: 6px 0 0;

  ::placeholder {
    color: #c4c4c4;
  }
`;

const disabled = css`
  background-color: #e7e7e7;
  cursor: pointer;
  text-align: left;
`;

const duplicateCheck = css`
  position: relative;
  cursor: pointer;
  width: 110px;
  font-size: 14px;
  height: 45px;
  border: 1px solid #66dd9c;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #66dd9c;
  color: #66dd9c;
`;

const thirdWrap = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const errorWrapper = ({ color }) => css`
  font-size: 12px;
  color: ${color};
  display: flex;
  align-items: center;
  line-height: 20px;
`;

const commitButtonWrapper = css`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  margin-top: 10px;

  & > button {
    cursor: pointer;
    font-size: 14px;
    height: 45px;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 0 10px;
    font-size: 14px;
    width: 48%;
  }

  & > button:nth-of-type(1) {
    background-color: #d7d9dc;
  }

  & > button:nth-of-type(2) {
    background-color: #66dd9c;
  }
`;

export default EditNickNameModal;
