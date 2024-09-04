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

  const correctFlashcardsFromCollection =
    getCorrectFlashcardsFromCollection(id);

  const collectionTitle = correctFlashcardsFromCollection[0]?.collectionTitle;
  const collectionColor = correctFlashcardsFromCollection[0]?.collectionColor;

  return (
    <>
      <FormFlashcard
        collections={collections}
        headline={
          actionMode === "edit" ? "Edit Flashcard" : "Create new Flashcard"
        }
        actionMode={actionMode}
        changeActionMode={changeActionMode}
        currentFlashcard={currentFlashcard}
        onSubmitFlashcard={
          actionMode === "edit" ? handleEditFlashcard : handleCreateFlashcard
        }
      />

      {correctFlashcardsFromCollection.length > 0 && (
        <FlashcardList
          handleDelete={handleDelete}
          headline={collectionTitle}
          subheading="Learned flashcards"
          flashcards={correctFlashcardsFromCollection}
          handleToggleCorrect={handleToggleCorrect}
          changeCurrentFlashcard={changeCurrentFlashcard}
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          collectionColor={collectionColor}
        />
      )}
      {(!correctFlashcardsFromCollection ||
        correctFlashcardsFromCollection.length === 0) && (
        <StyledMessage>
          No learned flashcards in this collection. Start learning!
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
