import { useRouter } from "next/router";
import FlashcardList from "@/components/FlashcardList/FlashcardList";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";
import styled from "styled-components";
import Footer from "@/components/Footer/Footer";

export default function CollectionPage({
  handleToggleCorrect,
  collections,
  handleEditFlashcard,
  handleCreateFlashcard,
  handleDelete,
  actionMode,
  changeActionMode,
  currentFlashcard,
  changeCurrentFlashcard,
  getAllFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  getCorrectFlashcardsFromCollection,
}) {
  const router = useRouter();
  const { id } = router.query;

  const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);
  const incorrectFlashcardsFromCollection =
    getIncorrectFlashcardsFromCollection(id);

  const collectionTitle = incorrectFlashcardsFromCollection[0]?.collectionTitle;
  const collectionColor = incorrectFlashcardsFromCollection[0]?.collectionColor;

  return (
    <>
      {actionMode !== "edit" && (
        <FormFlashcard
          collections={collections}
          headline="Create new Flashcard"
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          currentFlashcard={currentFlashcard}
          onSubmitFlashcard={handleCreateFlashcard}
        />
      )}

      {actionMode === "edit" && (
        <FormFlashcard
          collections={collections}
          headline="Edit Flashcard"
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          currentFlashcard={currentFlashcard}
          onSubmitFlashcard={handleEditFlashcard}
        />
      )}

      {incorrectFlashcardsFromCollection.length > 0 && (
        <FlashcardList
          handleDelete={handleDelete}
          headline={collectionTitle}
          subheading="Flashcards to learn"
          flashcards={incorrectFlashcardsFromCollection}
          handleToggleCorrect={handleToggleCorrect}
          changeCurrentFlashcard={changeCurrentFlashcard}
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          collectionColor={collectionColor}
        />
      )}
      {(!incorrectFlashcardsFromCollection ||
        incorrectFlashcardsFromCollection.length === 0) && (
        <StyledMessage>
          No unlearned flashcards in this collection. Add some new or review
          those you have already learned.
        </StyledMessage>
      )}
      <Footer
        allFlashcardsFromCollection={allFlashcardsFromCollection}
        getIncorrectFlashcardsFromCollection={
          getIncorrectFlashcardsFromCollection
        }
        getCorrectFlashcardsFromCollection={getCorrectFlashcardsFromCollection}
        id={id}
        actionMode={actionMode}
        changeActionMode={changeActionMode}
      />
    </>
  );
}

const StyledMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 40px 20px;
`;
