import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ProductRegist from "../components/product/ProductRegist";
import ProductDetail from "../components/product/ProductDetail";
import ProductChatting from "../components/product/ProductChatting";
import ProductList from "../components/product/ProductList";
import ProductPut from "../components/product/ProductPut";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const Product = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const nickName = window.localStorage.getItem("nickName");
  const areaLat = window.localStorage.getItem("areaLat");
  const areaLng = window.localStorage.getItem("areaLng");
  const navigate = useNavigate();

  useEffect(() => {
    // 동네 인증이 안됐으면 Product관련 페이지 이용 불가
    if (!accessToken) {
      alert("빌리지를 이용하시려면 로그인을 먼저 진행해주세요.");
      navigate(`/login`);
    }
    // 일반 로그인했을 때 동네인증 안된경우
    else if (areaLat == "null" || areaLng == "null" || areaLat == "undefined" || areaLng == "undefined") {
      if (nickName.includes("#")) {
        alert("빌리지를 이용하시려면 닉네임을 변경하셔야 해요.");
        navigate(`/socialnickname`, { state: { url: "/profile/product" } });
      } else {
        alert("빌리지를 이용하시려면 동네 인증을 해주셔야해요.");
        navigate(`/profile/product`);
      }
    }
  }, []);

  return (
    <div
      css={css`
        padding-top: 70px;
      `}
    >
      <Routes>
        <Route path="/regist" element={<ProductRegist />} />
        <Route path="/detail/share/:boardId" element={<ProductDetail />} />
        <Route path="/detail/ask/:boardId" element={<ProductDetail />} />
        <Route path="/chat/:roomId" element={<ProductChatting />} />
        <Route path="/list/share" element={<ProductList />} />
        <Route path="/list/ask" element={<ProductList />} />
        {/* useEffect로, pathname에 share, ask포함되어있으면 요청글 */}
        <Route path="/edit/share/:boardId" element={<ProductPut />} />
        <Route path="/edit/ask/:boardId" element={<ProductPut />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Product;
