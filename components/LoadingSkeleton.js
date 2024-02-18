"use client";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SyncLoader color="#0096FF" loading={true} css={override} size={15} />
    </div>
  );
}

export default LoadingSkeleton;
