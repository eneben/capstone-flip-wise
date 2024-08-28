import styled from "styled-components";

export default function ButtonWrapper({ children }) {
  return <StyledButtonWrapper>{children}</StyledButtonWrapper>;
}

const StyledButtonWrapper = styled.div`
  display: flex;
  padding: 20px 0 10px 0;
  gap: 10px;
  justify-content: center;
`;
