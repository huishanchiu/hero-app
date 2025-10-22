import styled from "@emotion/styled";
import { SkeletonStyle } from "../../style";
import breakpoints from "../../style/breakPoint";

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
  aspect-ratio: 6/9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  outline: solid 1px ${(props) => props.theme.colorNeutral900};
  @media (max-width: ${breakpoints.minDesktop}) {
    width: 300px;
  }
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
