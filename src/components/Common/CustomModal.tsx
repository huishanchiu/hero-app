import styled from "@emotion/styled";

type Props = {
  title: string;
  contents: string;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function CustomModal({
  title,
  contents,
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
}: Props) {
  return (
    <Modal>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{contents}</ModalMessage>
        <ModalButtons>
          <ModalButton onClick={onConfirm}>{confirmText}</ModalButton>
          <ModalButton primary onClick={onCancel}>
            {cancelText}
          </ModalButton>
        </ModalButtons>
      </ModalContent>
    </Modal>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.colorTransparent400};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
`;

const ModalTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 22px;
  color: ${(props) => props.theme.colorNeutral800};
`;

const ModalMessage = styled.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  color: ${(props) => props.theme.colorNeutral700};
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 8px;
  background: ${(props) =>
    props.primary ? props.theme.colorNeutral500 : props.theme.colorNeutral100};
  color: ${(props) => (props.primary ? props.theme.colorNeutral100 : props.theme.colorNeutral500)};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  border: solid 1px ${(props) => props.theme.colorNeutral500};
`;
