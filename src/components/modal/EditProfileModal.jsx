import React from "react";
// import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineExclamationCircle } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
// import bazzie from "../../assets/images/bazzi.jpg";
import ProfileImageSelect from "../profile/ProfileImageSelect";
import { getCheckNickName } from "../../api/user";
import { getUserDetail } from "../../api/user";
import { putUserPasswordNickName, putUserProfileImage } from "../../api/user";
import { useSetRecoilState } from "recoil";
import { loginUserState } from "../../recoil/atom";
import { SHA256 } from "../signup/HashFunction";

function EditProfile({ setIsEditProfileOpen }) {
  const userId = window.localStorage.getItem("id");
  const oauth = localStorage.getItem("oauth");
  const setLoginUser = useSetRecoilState(loginUserState);
  const [userNickName, setUserNickName] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [nickName, setNickName] = useState("");
  const [nickNameCheck, setNickNameCheck] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleted, setIsDeleted] = useState(true);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState("");
  const [imageList, setImageList] = useState([]);
  const [isNickNameOpen, setIsNickNameOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
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
  function onChangePassword(event) {
    setPassword(event.target.value);
  }
  function onChangePassword2(event) {
    setPassword2(event.target.value);
  }
  function onClickNickName() {
    setIsNickNameOpen(true);
  }
  function onClickPassword() {
    setIsPasswordOpen(true);
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
  function onClickVisible() {
    setIsVisible((prev) => !prev);
  }
  function onClickDeleteNickName() {
    setNickName("");
    setNickNameCheck("");
    setIsNickNameOpen(false);
    console.log("here");
  }
  function onClickDeletePassword() {
    setIsDeleted(true);
    setPassword("");
    setPassword2("");
    setIsPasswordOpen(false);
    console.log("here");
  }
  function receiveImageList(imageList) {
    setImageList(imageList);
  }
  function onClickCancle() {
    setIsEditProfileOpen(false);
  }
  function onSubmit() {
    if ((isNickNameAvailable || !isNickNameOpen) && !passwordError && !password2Error) {
      putUserPasswordNickName(userId, nickName, SHA256(password)).then((response) => {
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
            console.log(formData);
            putUserProfileImage(formData).then((response) => {
              if (response) {
                setIsEditProfileOpen(false);
              }
            });
          }
          alert("프로필 정보가 변경되었어요.");
          setIsEditProfileOpen(false);
          return;
        }
      });
    } else if (!isNickNameAvailable) {
      if ((nickName && nickName.length > 6) || (nickName && !/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣 ]*$/.test(nickName))) {
        setNickNameError("닉네임은 특수문자 제외 최대 6자까지 설정할 수 있어요.");
      } else {
        setNickNameError("중복 확인을 진행해주세요.");
      }
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
    } else if ((nickName && nickName.length > 6) || !/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣 ]*$/.test(nickName)) {
      setNickNameError("닉네임은 특수문자 제외 최대 6자까지 설정할 수 있어요.");
    } else {
      setNickNameError("");
    }
  }, [nickName]);
  useEffect(() => {
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/i.test(password) && password) {
      setPasswordError("영어 소문자, 숫자 조합 8~16자리로 입력해주세요.");
    } else {
      setPasswordError("");
    }
  }, [password]);
  useEffect(() => {
    if (password !== password2 && password2) {
      setPassword2Error("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
    } else {
      setPassword2Error("");
    }
    if (password || password2) {
      setIsDeleted(false);
    } else {
      setIsDeleted(true);
    }
  }, [password, password2]);
  useEffect(() => {
    if (password && password2 && !passwordError && !password2Error) {
      setIsPasswordConfirmed("비밀번호가 일치합니다.");
    } else {
      setIsPasswordConfirmed("");
    }
  }, [passwordError, password2Error]);
  return (
    <form css={EditProfileBox} autoComplete="off">
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
            // disabled={!isNickNameOpen}
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

      {/* 비밀번호 파트 */}
      {oauth !== "kakao" || oauth !== "naver" ? (
        <div css={secondWrap}>
          <div css={subTitleWrap}>
            <strong>비밀번호</strong>
          </div>
          <div css={condition}>8자 이상 16자 이하 영소문자와 숫자로만 작성해주세요</div>
          <div css={passwordWrapper}>
            <input
              name="password"
              type={isPasswordOpen ? "text" : "button"}
              placeholder={isPasswordOpen ? "비밀번호를 입력해주세요." : "수정을 원하면 클릭해주세요."}
              css={isPasswordOpen ? inputBox : [inputBox, disabled]}
              onChange={onChangePassword}
              onClick={() => {
                onClickPassword();
              }}
              value={isPasswordOpen ? password : "수정을 원하면 클릭해주세요."}
              // disabled={!isPasswordOpen}
            />
            {passwordError ? (
              <small css={errorWrapper({ color: "#fc0101" })}>
                <AiOutlineExclamationCircle size={12} />
                {passwordError}
              </small>
            ) : null}
            <div
              onClick={() => {
                onClickVisible();
              }}
            >
              {isVisible ? (
                <AiOutlineEye size="28" color="#66dd9c" />
              ) : (
                <AiOutlineEyeInvisible size="28" color="#66dd9c" />
              )}
            </div>
          </div>
          <div css={passwordWrapper}>
            <input
              name="password2"
              type={isPasswordOpen ? (isVisible ? "text" : "password") : "button"}
              placeholder={isPasswordOpen ? "비밀번호를 재입력해주세요." : null}
              css={isPasswordOpen ? inputBox : [inputBox, disabled]}
              onChange={onChangePassword2}
              value={password2}
              // disabled={!isPasswordOpen}
            />
            {password2Error ? (
              <small css={errorWrapper({ color: "#fc0101" })}>
                <AiOutlineExclamationCircle size={12} />
                {password2Error}
              </small>
            ) : null}
            {isPasswordConfirmed ? (
              <small css={errorWrapper({ color: "#66dd9c" })}>
                <BsCheck2Circle />
                {isPasswordConfirmed}
              </small>
            ) : null}
            <div
              onClick={() => {
                onClickDeletePassword();
              }}
            >
              {isDeleted ? null : <IoIosCloseCircle />}
            </div>
          </div>
        </div>
      ) : null}

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
          취소
        </button>
        <button type="button" onClick={onSubmit}>
          완료
        </button>
      </div>
      {/* flex 3개 마지막 div */}
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
  /* width: 100%; */
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

const secondWrap = css`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const passwordWrapper = css`
  position: relative;
  cursor: pointer;
  & > div {
    position: absolute;
    display: flex;
    align-items: center;
    right: 144px;
    height: 44px;
    top: 6px;
  }
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
export default EditProfile;
