import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ProfileEditButton from "./ProfileEditButton";
import ProfileSummary from "./ProfileSummary";
import ProfileLocation from "./ProfileLocation";
import ProfilePoint from "./ProfilePoint";
import ProfileDdayComp from "./ProfileDdayComp";
import { getUserDetail } from "../../api/user";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../recoil/atom";

const { kakao } = window;
const ProfileInformation = ({ setIsQrCodeOpen, setIsEditProfileOpen, isQrCodeOpen, isEditProfileOpen }) => {
  const id = localStorage.getItem("id");
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  // const [areaLng, setAreaLng] = useState("");
  // const [areaLat, setAreaLat] = useState("");
  const [location, setLocation] = useState("동네를 인증해주세요");
  const [profileImage, setProfileImage] = useState("");
  const [nickName, setNickName] = useState("");
  const [manner, setManner] = useState(0);
  const [point, setPoint] = useState(0);
  function onClickEditProfileOpen() {
    setIsEditProfileOpen(true);
  }

  // 불러온 유저정보 활용
  // https://apis.map.kakao.com/web/sample/coord2addr/ 참조하였음.

  const localLat = localStorage.getItem("areaLat");
  const localLng = localStorage.getItem("areaLng");

  var coords = new kakao.maps.LatLng(localLat, localLng);
  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const data = result[0];
        // console.log(data);

        // useState에 기본값에 "동네를 인증해주세요."를 넣어놓아도 반응이 없어서, 분기하였음
        if (data.region_1depth_name.length === 0) {
          setLocation("동네를 인증해주세요");
        } else {
          setLocation(data.region_1depth_name + " " + data.region_2depth_name + " " + data.region_3depth_name);
        }
      }
    });
    // console.log(localLat);
  }, [localLat]);

  // 좌표로 주소 불러오기
  // state에 있는, areaLat, areaLng를 불러와서 사용할건데, useEffect()에서 그 불러온 두 값은 이렇게 사용이 될거야.
  // function getAddr(areaLat, areaLng) {
  //   console.log("**************");
  //   const geocoder = new kakao.maps.services.Geocoder();
  //   function callback(result, status) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       const data = result[0].address;
  //       setLocation(data.region_1depth_name + " " + data.region_2depth_name + " " + data.region_3depth_name);
  //     }
  //   }
  //   geocoder.coord2Address(areaLng, areaLat, callback);
  // }
  useEffect(() => {
    setTimeout(() => {
      getUserDetail(id).then((response) => {
        // setAreaLat(response.areaLat);
        // setAreaLng(response.areaLng);
        setProfileImage(response.profile_img);
        setNickName(response.nickName);
        setManner(response.manner);
        setPoint(response.point);
        setLoginUser({
          ...loginUser,
          profileImg: response.profile_img,
        });
        localStorage.setItem("profileImg", response.profile_img);
        localStorage.setItem("nickName", response.nickName);
        localStorage.setItem("areaLat", response.areaLat);
        localStorage.setItem("areaLng", response.areaLng);
      });
    }, 100);
  }, [isQrCodeOpen, isEditProfileOpen, location]);
  // useEffect(() => {
  //   // getAddr(areaLng, areaLat);
  //   // console.log(areaLng, areaLat);
  //   setLocation("동네를 설정해주세요");
  // }, [areaLng, areaLat]);
  return (
    <div css={profileWrapper}>
      <ProfileEditButton text="프로필 수정하기" onClick={onClickEditProfileOpen} />
      <ProfileSummary profileImage={profileImage} manner={manner} nickName={nickName} />
      <ProfileLocation location={location} setIsQrCodeOpen={setIsQrCodeOpen} />
      <div
        css={css`
          width: 44%;
          padding-left: 20px;
        `}
      >
        <ProfilePoint point={point} />
        <ProfileDdayComp />
      </div>
    </div>
  );
};

const profileWrapper = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 300px;
  border: 1px solid #e1e2e3;
  border-radius: 5px;
  padding: 20px 2%;
  & h4 {
    font-size: 22px;
  }
  // 좌우 padding 2%이므로 내부 width 합은 96%
`;

export default ProfileInformation;
