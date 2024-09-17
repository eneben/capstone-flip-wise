import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";

export default function DeleteConfirmationDialog({
  onDeleteFlashcard,
  onDeleteCollection,
  toggleDeleteConfirmation,
  id,
  variant,
}) {
  function handleDelete() {
    if (variant === "flashcard") {
      onDeleteFlashcard(id);
    } else if (variant === "collection") {
      onDeleteCollection(id);
    }
  }

  return (
    <>
      <ConfirmationQuestion>
        {variant === "flashcard" && "Do you want to delete this flashcard?"}
        {variant === "collection" && "Do you want to delete this collection?"}
      </ConfirmationQuestion>
      <ButtonWrapper>
        <RegularButton
          content="Yes"
          onClick={handleDelete}
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

const ConfirmationQuestion = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
`;
