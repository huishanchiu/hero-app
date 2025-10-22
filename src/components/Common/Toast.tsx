import styled from "@emotion/styled";

type Props = {
  toast: { open: boolean; message: string };
};

const Toast = ({ toast }: Props) => (
  <ToastWrapper
    role="status"
    aria-live="polite"
    aria-atomic="true"
    aria-hidden={!toast.open}
    data-open={toast.open}
  >
    {toast.message}
  </ToastWrapper>
);

export default Toast;

const ToastWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 24px;
  right: 0;
  left: 0;
  margin: 0 auto;
  max-width: 20vw;
  padding: 12px 18px;
  border-radius: 10px;
  color: #fff;
  background-color: ${(props) => props.theme.colorTransparent600};
  font-weight: 600;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition:
    opacity 0.1s ease,
    transform 0.1s ease;
  z-index: 9999;

  &[data-open="true"] {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;
