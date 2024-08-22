import styled from "styled-components";
import { RegularButton, ButtonWrapper } from "../Button/Button";

export default function DeleteConfirmationDialog({
  onDelete,
  toggleDeleteConfirmation,
  flashcardId,
}) {
  return (
    <>
      <ConfirmationQuestion>
        Do you want to delete this flashcard?
      </ConfirmationQuestion>
      <ButtonWrapper>
        <RegularButton
          content="Yes"
          onClick={() => onDelete(flashcardId)}
          type="button"
          variant="confirm"
        />
        <RegularButton
          content="No"
          onClick={toggleDeleteConfirmation}
          type="button"
          variant="warning"
        />
      </ButtonWrapper>
    </>
  );
}

const ConfirmationQuestion = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  padding-top: 37.2px;
  text-align: center;
`;