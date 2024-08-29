import styled from "styled-components";

export default function FormInput({ name, actionMode, currentFlashcard }) {
  return (
    <StyledInput
      id={name}
      name={name}
      type="text"
      required
      defaultValue={actionMode === "edit" ? currentFlashcard[name] : ""}
    />
  );
}

const StyledInput = styled.input`
  width: 100%;
  height: 1.5rem;
`;
