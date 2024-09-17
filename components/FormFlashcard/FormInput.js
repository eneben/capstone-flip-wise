import styled from "styled-components";

export default function FormInput({
  name,
  maxlength,
  actionMode,
  currentFlashcard,
}) {
  return (
    <StyledInput
      id={name}
      name={name}
      maxLength={maxlength}
      type="text"
      required
      defaultValue={actionMode === "edit" ? currentFlashcard[name] : ""}
    />
  );
}

const StyledInput = styled.input`
  width: 100%;
  height: 1.5rem;
  border: 1px solid var(--primary-neutral);
  border-radius: 2px;
  &:focus {
    outline: 1px solid var(--primary-neutral);
  }
`;
