import FlashcardList from "@/components/FlashcardList/FlashcardList";
import styled from "styled-components";

export default function HomePage({
  flashcardsWithCollection,
  handleToggleCorrect,
  handleDelete,
  actionMode,
  changeActionMode,
  changeCurrentFlashcard,
}) {
  const incorrectFlashcards = flashcardsWithCollection.filter(
    (flashcard) => !flashcard.isCorrect
  );

  return (
    <>
      {incorrectFlashcards.length > 0 && (
        <FlashcardList
          handleDelete={handleDelete}
          headline="Random Study Cards"
          flashcards={incorrectFlashcards}
          handleToggleCorrect={handleToggleCorrect}
          changeCurrentFlashcard={changeCurrentFlashcard}
          actionMode={actionMode}
          changeActionMode={changeActionMode}
        />
      )}
      {(!incorrectFlashcards || incorrectFlashcards.length === 0) && (
        <StyledMessage>
          No incorrectly answered flashcards. Look at archive or add new
          flashcards.
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
