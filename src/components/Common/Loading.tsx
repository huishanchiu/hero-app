import styled from "@emotion/styled";

export default function Loading() {
  return (
    <Overlay role="status" aria-busy="true">
      <Spinner />
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #b7b7b7;
  border-top-color: #8b8b8b;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
