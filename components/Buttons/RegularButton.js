import styled, { css } from "styled-components";

export default function RegularButton({ content, onClick, type, variant }) {
  return (
    <StyledRegularButton type={type} onClick={onClick} $variant={variant}>
      {content}
    </StyledRegularButton>
  );
}

const StyledRegularButton = styled.button`
  padding: 6px 12px;
  font-weight: 500;
  border-style: none;
  border-radius: 4px;
  ${(props) => variantRegularButtonStyles[props.$variant]}
`;

const variantRegularButtonStyles = {
  submit: css`
    color: #fff;
    background-color: var(--primary-neutral);
  `,
  confirm: css`
    color: #fff;
    background-color: var(--primary-neutral);
  `,
  warning: css`
    color: #fff;
    background-color: var(--primary-red);
  `,
};
