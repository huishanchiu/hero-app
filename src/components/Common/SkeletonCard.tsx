import styled from "@emotion/styled";
import { SkeletonStyle } from "./style";

export default function SkeletonCard() {
  return (
    <Wrapper>
      <Avatar />
      <Line width="80%" height="20px" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  outline: #000 solid 1px;
`;

const Avatar = styled.div`
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 12px;
  ${SkeletonStyle}
`;

const Line = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "16px"};
  border-radius: 4px;
  ${SkeletonStyle}
`;
