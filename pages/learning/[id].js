import { useRouter } from "next/router";
import FlashcardList from "@/components/FlashcardList/FlashcardList";
import styled from "styled-components";
import Footer from "@/components/Footer/Footer";

export default function LearningCollectionPage({
  handleToggleCorrect,
  handleDeleteFlashcard,
  changeActionMode,
  changeCurrentFlashcard,
  getAllFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  getCorrectFlashcardsFromCollection,
  flashcardSelection,
  changeFlashcardSelection,
}) {
  const router = useRouter();
  const { id } = router.query;

  const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);
  const incorrectFlashcardsFromCollection =
    getIncorrectFlashcardsFromCollection(id);
  const correctFlashcardsFromCollection =
    getCorrectFlashcardsFromCollection(id);

  let displayedFlashcards;

  if (flashcardSelection === "all") {
    displayedFlashcards = allFlashcardsFromCollection;
  } else if (flashcardSelection === "learned") {
    displayedFlashcards = correctFlashcardsFromCollection;
  } else if (flashcardSelection === "to-learn") {
    displayedFlashcards = incorrectFlashcardsFromCollection;
  }

  const collectionTitle = displayedFlashcards?.[0]?.collectionTitle;
  const collectionColor = displayedFlashcards?.[0]?.collectionColor;

  return (
    <>
      {allFlashcardsFromCollection.length > 0 && (
        <FlashcardList
          handleDeleteFlashcard={handleDeleteFlashcard}
          headline={collectionTitle}
          subheading={
            (flashcardSelection === "all" && "All flashcards") ||
            (flashcardSelection === "learned" && "Learned flashcards") ||
            (flashcardSelection === "to-learn" && "Flashcards to learn")
          }
          flashcards={displayedFlashcards}
          handleToggleCorrect={handleToggleCorrect}
          changeCurrentFlashcard={changeCurrentFlashcard}
          changeActionMode={changeActionMode}
          collectionColor={collectionColor}
          modeSelection="learning"
        />
      )}
      {(!displayedFlashcards || displayedFlashcards.length === 0) && (
        <StyledMessage>
          {(flashcardSelection === "all" &&
            "No flashcards in this collection found. Add some new!") ||
            (flashcardSelection === "learned" &&
              "No learned flashcards in this collection. Start learning!") ||
            (flashcardSelection === "to-learn" &&
              "No unlearned flashcards in this collection. Add some new or review those you have already learned.")}
        </StyledMessage>
      )}
      <Footer
        allFlashcardsFromCollection={allFlashcardsFromCollection}
        getIncorrectFlashcardsFromCollection={
          getIncorrectFlashcardsFromCollection
        }
        getCorrectFlashcardsFromCollection={getCorrectFlashcardsFromCollection}
        id={id}
        flashcardSelection={flashcardSelection}
        changeFlashcardSelection={changeFlashcardSelection}
      />
    </>
  );
}

const StyledMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 40px 20px;
`;