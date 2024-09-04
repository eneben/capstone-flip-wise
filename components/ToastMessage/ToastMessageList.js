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

const StyledToastMessageList = styled.li`
  display: flex;
  flex-direction: column-reverse;
`;
