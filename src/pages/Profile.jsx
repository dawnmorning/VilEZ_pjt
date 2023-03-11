import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfileInformation from "../components/profile/ProfileInformation";
import ProfileMainCalendar from "../components/profile/ProfileMainCalendar";
import ProfileMainProduct from "../components/profile/ProfileMainProduct";
import ProfileMainPoint from "../components/profile/ProfileMainPoint";
import EditProfileModal from "../components/modal/EditProfileModal";
import Qrcode from "../components/modal/QrcodeModal";

const Profile = () => {
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [move, setMove] = useState("calc(50% - 55px)");
  const navigate = useNavigate();

  function checkSocialNickName() {
    const nickName = window.localStorage.getItem("nickName");

    if (nickName.slice(0, 1) === "#") {
      alert("닉네임 변경을 진행해주세요.");
      navigate("/socialnickname", { state: { url: "/profile" } });
    } else {
      navigate("/profile/product");
    }
  }

  useEffect(() => {
    checkSocialNickName();
  }, []);

  return (
    <div css={ProfileWrapper}>
      <ProfileInformation
        setIsQrCodeOpen={setIsQrCodeOpen}
        setIsEditProfileOpen={setIsEditProfileOpen}
        isQrCodeOpen={isQrCodeOpen}
        isEditProfileOpen={isEditProfileOpen}
      />
      <div css={linkWrapper(move)}>
        <Link
          to={"/profile/calendar"}
          onClick={() => {
            setMove("-12px");
          }}
        >
          공유 캘린더
        </Link>
        <Link
          to={"/profile/product"}
          onClick={() => {
            setMove("calc(50% - 55px)");
          }}
        >
          공유 목록
        </Link>
        <Link
          to={"/profile/point"}
          onClick={() => {
            setMove("calc(100% - 98px)");
          }}
        >
          포인트 내역
        </Link>
      </div>

      <Routes>
        <Route path="/calendar" element={<ProfileMainCalendar />} />
        <Route path="/product" element={<ProfileMainProduct />} />
        <Route path="/point" element={<ProfileMainPoint />} />
      </Routes>
      <div
        css={css`
          display: flex;
          align-items: flex-start;
        `}
      ></div>
      {isEditProfileOpen ? (
        <div css={modalWrapper}>
          <EditProfileModal setIsEditProfileOpen={setIsEditProfileOpen} />
        </div>
      ) : null}
      {isQrCodeOpen ? (
        <div css={modalWrapper}>
          <Qrcode setIsQrCodeOpen={setIsQrCodeOpen} />
        </div>
      ) : null}
    </div>
  );
};

const ProfileWrapper = css`
  margin: 130px 200px 60px;
`;
const linkWrapper = (props) => css`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: calc(50%);
  min-width: 300px;
  margin: 30px auto;
  font-size: 18px;
  ::after {
    position: absolute;
    bottom: -10px;
    border-radius: 10px;
    left: ${props};
    display: block;
    width: 110px;
    height: 6px;
    background-color: #66dd9c;
    content: "";
    transition: all 0.3s;
  }
  & > a {
    color: #000;
  }
`;
const modalWrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
export default Profile;
