import FlashcardList from "@/components/FlashcardList/FlashcardList";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";
import styled from "styled-components";

export default function HomePage({
  flashcardsWithCollection,
  handleIsCorrect,
  collections,
  handleCreateFlashcard,
}) {
  const incorrectFlashcards = flashcardsWithCollection.filter(
    (flashcard) => !flashcard.isCorrect
  );

  return (
    <>
      <FormFlashcard
        onCreateFlashcard={handleCreateFlashcard}
        collections={collections}
      />
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
