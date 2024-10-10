import styled from "styled-components";

export default function LoadingSpinner() {
  return (
    <LoadingSpinnerContainer>
      <StyledLoadingSpinner aria-label="loading-spinner" />
    </LoadingSpinnerContainer>
  );
}

const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 100px 0;
`;

const StyledLoadingSpinner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
