import axios from "axios";
import { useRouteError, Link } from "react-router-dom";
import styled from "@emotion/styled";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    return (
      <Wrapper>
        <h2>載入失敗（{status ?? "Unknown"}）</h2>
        <p>{error.message}</p>
        <Link to="/">回首頁</Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>發生未知錯誤</h2>
      <Link to="/">回首頁</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
`;
