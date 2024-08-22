import FlashcardList from "@/components/FlashcardList/FlashcardList";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";
import styled from "styled-components";

export default function HomePage({
  flashcardsWithCollection,
  handleToggleCorrect,
  collections,
  handleCreateFlashcard,
  handleDelete,
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
          handleDelete={handleDelete}
          headline="Random Study Cards"
          flashcards={incorrectFlashcards}
          handleToggleCorrect={handleToggleCorrect}
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
