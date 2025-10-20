import { css } from "@emotion/react";

export const SkeletonStyle = css`
  background: linear-gradient(90deg, #e5e7eb, #f3f4f6, #e5e7eb);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;

  @keyframes shimmer {
    0% {
      background-position: -60px 0;
    }
    100% {
      background-position: 60px;
    }
  }
`;
