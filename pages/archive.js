import FlashcardList from "@/components/FlashcardList/FlashcardList";
import styled from "styled-components";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";

export default function Archive({
  flashcardsWithCollection,
  handleToggleCorrect,
  collections,
  currentFlashcard,
  changeCurrentFlashcard,
  handleDelete,
  actionMode,
  changeActionMode,
  handleEditFlashcard,
}) {
  const correctFlashcards = flashcardsWithCollection.filter(
    (flashcard) => flashcard.isCorrect === true
  );

  return (
    <>
      {correctFlashcards.length > 0 && actionMode === "edit" && (
        <FormFlashcard
          collections={collections}
          headline="Edit Flashcard"
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          currentFlashcard={currentFlashcard}
          onSubmitFlashcard={handleEditFlashcard}
        />
      )}

      {correctFlashcards.length > 0 && (
        <FlashcardList
          headline="Archive"
          flashcards={correctFlashcards}
          handleToggleCorrect={handleToggleCorrect}
          handleDelete={handleDelete}
          changeCurrentFlashcard={changeCurrentFlashcard}
          actionMode={actionMode}
          changeActionMode={changeActionMode}
        />
      )}
      {(!correctFlashcards || correctFlashcards.length === 0) && (
        <StyledMessage>
          No flashcards have been correctly answered yet.
        </StyledMessage>
      )}
    </>
  );
}

const StyledMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 40px 20px;
`;
