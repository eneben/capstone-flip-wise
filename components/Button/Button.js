import styled from "styled-components";

export default function Button(content, onClick, type, variant) {
  return (
    <StyledButton type={type} onClick={onClick} $variant={variant}>
      {content}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${(props) =>
    props.$variant === "regular" &&
    css`
      padding: 6px 12px;
      font-weight: 500;
      color: #fff;
      background-color: #000;
      border-style: none;
      border-radius: 4px;
    `}
`;
