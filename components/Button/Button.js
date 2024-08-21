import styled, { css } from "styled-components";

export function RegularButton({ content, onClick, type, variant }) {
  return (
    <StyledRegularButton type={type} onClick={onClick} $variant={variant}>
      {content}
    </StyledRegularButton>
  );
}

export function RoundButton({ content, onClick, type, variant }) {
  return (
    <StyledRoundButton type={type} onClick={onClick} $variant={variant}>
      {content}
    </StyledRoundButton>
  );
}

const StyledRegularButton = styled.button`
  padding: 6px 12px;
  font-weight: 500;
  border-style: none;
  border-radius: 4px;

  ${(props) =>
    props.$variant === "submit" &&
    css`
      color: #fff;
      background-color: #000;
    `}

  ${(props) =>
    props.$variant === "confirm" &&
    css`
      color: #fff;
      background-color: #000;
    `}

    ${(props) =>
    props.$variant === "warning" &&
    css`
      color: #000;
      background-color: #edafb8;
    `}
`;

const StyledRoundButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$variant === "markAsCorrect" &&
    css`
      background-color: #b0c4b1;
      position: absolute;
      bottom: 15px;
      left: 10px;
    `}

  ${(props) =>
    props.$variant === "markAsIncorrect" &&
    css`
      background-color: #edafb8;
      position: absolute;
      bottom: 15px;
      left: 10px;
    `}

    ${(props) =>
    props.$variant === "delete" &&
    css`
      background-color: #eee;
      position: absolute;
      top: 15px;
      right: 10px;
    `}
`;
