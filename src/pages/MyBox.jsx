import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MyBoxMain from "../components/mybox/MyBoxMain.jsx";
import NotFound from "./NotFound";

const MyBox = () => {
  const navigate = useNavigate();
  function checkSocialNickName() {
    const nickName = window.localStorage.getItem("nickName");
    if (nickName.slice(0, 1) === "#") {
      alert("닉네임 변경을 진행해주세요.");
      navigate("/socialnickname", { state: { url: "/mybox" } });
    }
  }
  useEffect(() => {
    checkSocialNickName();
  }, []);
  return (
    <div css={innerBox}>
      <Routes>
        <Route path="/" element={<MyBoxMain />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const innerBox = css`
  width: calc(100% - 400px);
  height: 600px;
  margin: 110px auto;
`;
export default MyBox;
