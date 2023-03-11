import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const DivideLine = ({ width }) => {
  return <div css={line} style={{ width: width }}></div>;
};

const line = css`
  width: 100%;
  border: 1px solid #e1e2e3;
`;

export default DivideLine;
