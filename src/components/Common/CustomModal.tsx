import styled from "@emotion/styled";

type Props = {
  title: string;
  contents: string;
  closeText: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CustomModal({
  title,
  contents,
  onClose,
  onConfirm,
  closeText,
  confirmText,
}: Props) {
  return (
    <Modal>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{contents}</ModalMessage>
        <ModalButtons>
          <ModalButton onClick={onConfirm}>{confirmText}</ModalButton>
          <ModalButton primary onClick={onClose}>
            {closeText}
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
  background: rgba(0, 0, 0, 0.4);
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
  color: #1f2937;
`;

const ModalMessage = styled.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #4b5563;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 8px;
  background: ${(props) => (props.primary ? "#505050" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#5e5e5e")};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  border: #5e5e5e solid 1px;

  &:hover {
    opacity: 0.8;
  }
`;
