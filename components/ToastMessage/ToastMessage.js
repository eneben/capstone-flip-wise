import styled, { css, keyframes } from "styled-components";

export default function ToastMessage({ text, variant, icon: Icon, onClick }) {
  return (
    <ToastMessageContainerWrapper onClick={onClick}>
      <ProgressBarWrapper>
        <StyledProgressBar $variant={variant} />
      </ProgressBarWrapper>
      <MessageContentWrapper>
        <StyledIconWrapper $variant={variant}>
          <Icon />
        </StyledIconWrapper>
        <StyledToastMessageText>{text}</StyledToastMessageText>
      </MessageContentWrapper>
    </ToastMessageContainerWrapper>
  );
}

const slideInAndFade = keyframes`
 0% {
    opacity: 0;             
    transform: translateX(100%);
  }
  100% {
    opacity: 1;              
    transform: translateX(0);
  }
`;

const slideOutAndFade = keyframes`
0% {
    opacity: 1;              
    transform: translateX(0);
  }
  100% {
    opacity: 0;              
    transform: translateX(100%);
  }
`;

const ToastMessageContainerWrapper = styled.article`
  max-width: 200px;
  width: 90%;
  background-color: #fff;
  padding: 10px 10px;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  animation: ${slideInAndFade} 0.5s ease-out forwards,
    ${slideOutAndFade} 0.5s ease-in forwards 5s;
  cursor: pointer;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  border-radius: 2px;
`;

const StyledProgressBar = styled.div`
  width: 100%;
  height: 100%;
  animation: progress 5s linear forwards;

  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0;
    }
  }
  ${(props) => variantToastMessageStyles[props.$variant]}
`;

const MessageContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0px 0px 0px;
  gap: 10px;
`;

const StyledIconWrapper = styled.div`
  border-radius: 50%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => variantToastMessageStyles[props.$variant]}
`;

const StyledToastMessageText = styled.p`
  font-weight: 600;
  line-height: 1.1rem;
`;

const variantToastMessageStyles = {
  success: css`
    background-color: #b0c4b1;
  `,
  error: css`
    background-color: #edafb8;
  `,
};
