import styled, { css } from "styled-components";

export default function RoundButton({
  content,
  onClick,
  type,
  variant,
  disabled,
  actionMode,
  isRotate,
}) {
  return (
    <StyledRoundButton
      type={type}
      onClick={onClick}
      $variant={variant}
      disabled={disabled}
      $actionMode={actionMode}
      $isRotate={isRotate}
    >
      {content}
    </StyledRoundButton>
  );
}

const StyledRoundButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.$actionMode !== "default" &&
    css`
      opacity: 0.5;
    `}
  ${(props) => variantRoundButtonStyles[props.$variant]}
`;

const variantRoundButtonStyles = {
  markAsCorrect: css`
    background-color: #b0c4b1;
    position: absolute;
    bottom: 15px;
    left: 10px;
  `,
  markAsIncorrect: css`
    background-color: #edafb8;
    position: absolute;
    bottom: 15px;
    left: 10px;
  `,
  delete: css`
    background-color: #eee;
    position: absolute;
    top: 15px;
    right: 10px;
  `,
  edit: css`
    background-color: #eee;
    position: absolute;
    top: 15px;
    right: 60px;
  `,
  formToggle: css`
    position: fixed;
    background-color: #fff;
    rotate: ${(props) => (props.$isRotate ? "1.125turn" : "0")};
    transition: 0.3s ease-out;
    opacity: 1;
  `,
};
