import React from "react";
import { useLocation } from "react-router";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import EditNickNameModal from "../components/modal/EditNickNameModal";

const SocialNickName = () => {
  const location = useLocation();
  const url = location.state.url;

  return (
    <div css={modalWrapper}>
      <EditNickNameModal url={url} />
    </div>
  );
};

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

export default SocialNickName;
