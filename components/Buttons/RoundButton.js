import styled, { css } from "styled-components";

export default function RoundButton({
  content,
  onClick,
  type,
  variant,
  isRotate,
}) {
  return (
    <StyledRoundButton
      type={type}
      onClick={onClick}
      $variant={variant}
      $isRotate={isRotate}
    >
      {content}
    </StyledRoundButton>
  );
}

const StyledRoundButton = styled.button`
  color: #fff;
  width: 34px;
  height: 34px;
  padding: 7px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => variantRoundButtonStyles[props.$variant]}
`;

const variantRoundButtonStyles = {
  markAsCorrect: css`
    background-color: var(--primary-green);
  `,
  markAsIncorrect: css`
    background-color: var(--primary-red);
  `,
  delete: css`
    background-color: var(--primary-neutral);
  `,
  edit: css`
    background-color: var(--primary-neutral);
  `,
  formToggle: css`
    color: #000;
    width: 40px;
    height: 40px;
    position: fixed;
    background-color: #fff;
    rotate: ${(props) => (props.$isRotate ? "1.125turn" : "0")};
    transition: 0.3s ease-out;
    opacity: 1;
  `,
};
