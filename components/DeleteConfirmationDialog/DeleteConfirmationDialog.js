import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";

export default function DeleteConfirmationDialog({
  onDeleteFlashcard,
  onDeleteCollection,
  toggleDeleteConfirmation,
  onDeleteTemporaryFlashcards,
  id,
  variant,
}) {
  function handleDelete() {
    if (variant === "flashcard") {
      onDeleteFlashcard(id);
    } else if (variant === "collection") {
      onDeleteCollection(id);
    } else if (variant === "preview collection and all flashcards in it") {
      onDeleteTemporaryFlashcards();
    }
  }

  return (
    <>
      <ConfirmationQuestion>
        Do you want to delete this {variant}?
      </ConfirmationQuestion>
      <ButtonWrapper>
        <RegularButton onClick={handleDelete} type="button" variant="warning">
          Yes
        </RegularButton>
        <RegularButton
          onClick={toggleDeleteConfirmation}
          type="button"
          variant="confirm"
        >
          No
        </RegularButton>
      </ButtonWrapper>
    </>
  );
}

const ConfirmationQuestion = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
`;
