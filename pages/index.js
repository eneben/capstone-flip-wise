import FlashcardList from "@/components/FlashcardList/FlashcardList";
import FormCreateFlashcard from "@/components/FormCreateFlashcard/FormCreateFlashcard";
import styled from "styled-components";

export default function HomePage({
  flashcardsWithCollection,
  handleIsCorrect,
}) {
  const incorrectFlashcards = flashcardsWithCollection.filter(
    (flashcard) => !flashcard.isCorrect
  );

  return (
    <>
      <FormCreateFlashcard />
      {incorrectFlashcards.length > 0 && (
        <FlashcardList
          headline="Random Study Cards"
          flashcards={incorrectFlashcards}
          handleIsCorrect={handleIsCorrect}
        />
      )}
      {(!incorrectFlashcards || incorrectFlashcards.length === 0) && (
        <StyledMessage>
          All flashcards have been correctly answered. Have a look in the
          archive.
        </StyledMessage>
      )}
    </>
  );
}

const StyledMessage = styled.p`
  font-size: 1rem;
  padding: 40px 20px;
`;
