import FlashcardList from "@/components/FlashcardList/FlashcardList";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";
import styled from "styled-components";

export default function HomePage({
  flashcardsWithCollection,
  handleToggleCorrect,
  collections,
  handleCreateFlashcard,
  handleDelete,
  actionMode,
  changeActionMode,
  currentFlashcard,
  setCurrentFlashcard,
  handleEditFlashcard,
}) {
  const incorrectFlashcards = flashcardsWithCollection.filter(
    (flashcard) => !flashcard.isCorrect
  );

  return (
    <>
      {actionMode !== "edit" && (
        <FormFlashcard
          onCreateFlashcard={handleCreateFlashcard}
          collections={collections}
          headline="Create new Flashcard"
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          currentFlashcard={currentFlashcard}
          onEditFlashcard={handleEditFlashcard}
        />
      )}

      {actionMode === "edit" && (
        <FormFlashcard
          onCreateFlashcard={handleCreateFlashcard}
          collections={collections}
          headline="Edit Flashcard"
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          currentFlashcard={currentFlashcard}
          onEditFlashcard={handleEditFlashcard}
        />
      )}

      {incorrectFlashcards.length > 0 && (
        <FlashcardList
          handleDelete={handleDelete}
          headline="Random Study Cards"
          flashcards={incorrectFlashcards}
          handleToggleCorrect={handleToggleCorrect}
          setCurrentFlashcard={setCurrentFlashcard}
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
