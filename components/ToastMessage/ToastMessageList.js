import styled from "styled-components";
import ToastMessage from "./ToastMessage";

export default function ToastMessageList({ toastMessages, hideToastMessage }) {
  return (
    <StyledToastMessageList>
      {toastMessages.map((toast) => (
        <ToastMessage
          key={toast.id}
          text={toast.message}
          variant={toast.variant}
          icon={toast.icon}
          onClick={() => hideToastMessage(toast.id)}
        />
      ))}
    </StyledToastMessageList>
  );
}

const StyledToastMessageList = styled.ul`
  width: 100%;
  display: flex;
  position: fixed;
  flex-direction: column-reverse;
  align-items: flex-end;
  bottom: 10px;
  right: 10px;
  gap: 10px;
  list-style: none;
  z-index: 1000;
`;
