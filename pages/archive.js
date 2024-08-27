import FlashcardList from "@/components/FlashcardList/FlashcardList";
import styled from "styled-components";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";

export default function Archive({
  flashcardsWithCollection,
  handleToggleCorrect,
  collections,
  currentFlashcard,
  setCurrentFlashcard,
  handleEditFlashcard,
  handleDelete,
  isEdit,
  setIsEdit,
  handleCreateFlashcard,
}) {
  const correctFlashcards = flashcardsWithCollection.filter(
    (flashcard) => flashcard.isCorrect === true
  );

  return (
    <>
      {correctFlashcards.length > 0 && isEdit && (
        <FormFlashcard
          onCreateFlashcard={handleCreateFlashcard}
          collections={collections}
          headline="Edit Flashcard"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          currentFlashcard={currentFlashcard}
          onEditFlashcard={handleEditFlashcard}
        />
      )}

      {correctFlashcards.length > 0 && (
        <FlashcardList
          headline="Archive"
          flashcards={correctFlashcards}
          handleToggleCorrect={handleToggleCorrect}
          handleDelete={handleDelete}
          setCurrentFlashcard={setCurrentFlashcard}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
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
