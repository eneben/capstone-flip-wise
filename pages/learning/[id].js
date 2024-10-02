import { useRouter } from "next/router";
import styled from "styled-components";
import Footer from "@/components/Footer/Footer";
import Flashcard from "@/components/Flashcard/Flashcard";

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

  function sortFlashcardsById(flashcards) {
    return flashcards.sort((a, b) => {
      return a.id - b.id;
    });
  }

  const sortedFlashcards = sortFlashcardsById(displayedFlashcards);

  return (
    <>
      {allFlashcardsFromCollection.length > 0 && (
        <>
          <StyledHeadline>{collectionTitle}</StyledHeadline>
          <StyledSubheading>
            {(flashcardSelection === "all" && "All flashcards") ||
              (flashcardSelection === "learned" && "Learned flashcards") ||
              (flashcardSelection === "to-learn" && "Flashcards to learn")}
          </StyledSubheading>

          <FlashcardListWrapper>
            {sortedFlashcards.map((flashcard) => {
              return (
                <Flashcard
                  collectionColor={collectionColor}
                  handleDeleteFlashcard={handleDeleteFlashcard}
                  key={flashcard.id}
                  flashcard={flashcard}
                  onToggleCorrect={handleToggleCorrect}
                  changeCurrentFlashcard={changeCurrentFlashcard}
                  changeActionMode={changeActionMode}
                  modeSelection="learning"
                />
              );
            })}
          </FlashcardListWrapper>
        </>
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
  font-size: 1.3rem;
  padding: 40px 20px;
`;

const FlashcardListWrapper = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  list-style: none;
`;

const StyledHeadline = styled.h2`
  font: var(--main-headline);
  text-align: center;
  padding-top: 35px;
`;

const StyledSubheading = styled.h3`
  font: var(--sub-headline);
  text-align: center;
  padding: 5px 0 30px 0;
`;
