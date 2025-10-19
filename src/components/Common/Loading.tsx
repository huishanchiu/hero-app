import styled from "@emotion/styled";

export default function FullScreenLoader() {
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
  background-color: rgba(198, 198, 198, 0.8);
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #c8c8c8;
  border-top-color: #72727248;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
