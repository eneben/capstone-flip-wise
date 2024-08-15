import FlashcardList from "@/components/FlashcardList/FlashcardList";
import styled from "styled-components";

export default function Archive({ flashcardsWithCollection, handleIsCorrect }) {
  const correctFlashcards = flashcardsWithCollection.filter(
    (flashcard) => flashcard.isCorrect === true
  );

  return (
    <>
      {correctFlashcards.length > 0 && (
        <FlashcardList
          headline="Archive"
          flashcards={correctFlashcards}
          handleIsCorrect={handleIsCorrect}
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
  font-size: 1rem;
  padding: 40px 20px;
`;
