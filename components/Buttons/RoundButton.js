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
  svg {
    fill: #fff;
  }
  width: 34px;
  height: 34px;
  padding: 7px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $actionMode }) =>
    $actionMode !== "default" &&
    css`
      opacity: 0.5;
    `}
  ${(props) => variantRoundButtonStyles[props.$variant]}
`;

const variantRoundButtonStyles = {
  markAsCorrect: css`
    background-color: #2a9d8f;
    position: absolute;
    bottom: 15px;
    left: 10px;
  `,
  markAsIncorrect: css`
    background-color: #e76f51;
    position: absolute;
    bottom: 15px;
    left: 10px;
  `,
  delete: css`
    background-color: #264653;
    position: absolute;
    top: 15px;
    right: 10px;
  `,
  edit: css`
    background-color: #264653;
    position: absolute;
    top: 15px;
    right: 53px;
  `,
  formToggle: css`
    svg {
      fill: #000;
    }
    width: 40px;
    height: 40px;
    position: fixed;
    background-color: #fff;
    box-shadow: 0px 0px 10px #000;

    rotate: ${(props) => (props.$isRotate ? "1.125turn" : "0")};
    transition: 0.3s ease-out;
    opacity: 1;
  `,
};
