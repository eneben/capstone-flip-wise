import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Flashcard from "@/components/Flashcard/Flashcard";

export default function CollectionPage({
  handleToggleCorrect,
  handleDeleteFlashcard,
  changeActionMode,
  changeCurrentFlashcard,
  getAllFlashcardsFromCollection,
  handleIncreaseFlashcardLevel,
  handleDecreaseFlashcardLevel,
}) {
  const router = useRouter();
  const { id } = router.query;

  const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);

  const collectionTitle = allFlashcardsFromCollection?.[0]?.collectionTitle;
  const collectionColor = allFlashcardsFromCollection?.[0]?.collectionColor;

  const [currentIndex, setCurrentIndex] = useState(0);

  function sortFlashcardsByLevel(flashcards) {
    return flashcards.sort((a, b) => {
      if (a.level !== b.level) {
        return a.level - b.level;
      }

      if (!a.trainingDate && !b.trainingDate) {
        return 0;
      } else if (!a.trainingDate) {
        return -1;
      } else if (!b.trainingDate) {
        return 1;
      } else {
        return a.trainingDate - b.trainingDate;
      }
    });
  }

  const sortedFlashcards = sortFlashcardsByLevel(allFlashcardsFromCollection);

  function areAllCardsLearned(flashcards) {
    return flashcards.length > 0 && flashcards[0].level === 5;
  }

  const allLearned = areAllCardsLearned(sortedFlashcards);

  function getFlashcardAtPosition(currentIndex, position, flashcards) {
    const totalFlashcards = flashcards.length;
    if (totalFlashcards === 0) return null;

    const targetIndex = (currentIndex + position) % totalFlashcards;

    return flashcards[targetIndex];
  }

  const currentFlashcard = getFlashcardAtPosition(
    currentIndex,
    0,
    sortedFlashcards
  );
  const nextFlashcard = getFlashcardAtPosition(
    currentIndex,
    1,
    sortedFlashcards
  );
  const thirdFlashcard = getFlashcardAtPosition(
    currentIndex,
    2,
    sortedFlashcards
  );

  function handleSwipe(direction) {
    if (direction === "right") {
      handleIncreaseFlashcardLevel(currentFlashcard.id);
    } else if (direction === "left") {
      handleDecreaseFlashcardLevel(currentFlashcard.id);
    }

    setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedFlashcards.length);
  }

  return (
    <>
      {allFlashcardsFromCollection.length > 0 && (
        <>
          <StyledHeadline>{collectionTitle}</StyledHeadline>
          <StyledSubheading>Training Mode</StyledSubheading>

          {allLearned && (
            <StyledSuccessMessage>
              You have trained all flashcards up to the last level, BrainStack
              Champion! <span aria-label="party-popper-emoji">🎉</span>
            </StyledSuccessMessage>
          )}

          <FlashcardListWrapper>
            <FlashcardStackWrapper>
              <ThirdFlashcardWrapper>
                <Flashcard
                  collectionColor={collectionColor}
                  handleDeleteFlashcard={handleDeleteFlashcard}
                  flashcard={thirdFlashcard}
                  onToggleCorrect={handleToggleCorrect}
                  changeCurrentFlashcard={changeCurrentFlashcard}
                  changeActionMode={changeActionMode}
                  modeSelection="training"
                  onIncreaseFlashcardLevel={handleIncreaseFlashcardLevel}
                  onDecreaseFlashcardLevel={handleDecreaseFlashcardLevel}
                />
              </ThirdFlashcardWrapper>
              <ThirdFlashcardOpacity />
              <SecondFlashcardWrapper>
                <Flashcard
                  collectionColor={collectionColor}
                  handleDeleteFlashcard={handleDeleteFlashcard}
                  flashcard={nextFlashcard}
                  onToggleCorrect={handleToggleCorrect}
                  changeCurrentFlashcard={changeCurrentFlashcard}
                  changeActionMode={changeActionMode}
                  modeSelection="training"
                  onIncreaseFlashcardLevel={handleIncreaseFlashcardLevel}
                  onDecreaseFlashcardLevel={handleDecreaseFlashcardLevel}
                />
              </SecondFlashcardWrapper>
              <SecondFlashcardOpacity />
              <Flashcard
                collectionColor={collectionColor}
                handleDeleteFlashcard={handleDeleteFlashcard}
                flashcard={currentFlashcard}
                onToggleCorrect={handleToggleCorrect}
                changeCurrentFlashcard={changeCurrentFlashcard}
                changeActionMode={changeActionMode}
                modeSelection="training"
                onIncreaseFlashcardLevel={handleIncreaseFlashcardLevel}
                onDecreaseFlashcardLevel={handleDecreaseFlashcardLevel}
                onSwipe={handleSwipe}
              />
            </FlashcardStackWrapper>
          </FlashcardListWrapper>
        </>
      )}
      {(!allFlashcardsFromCollection ||
        allFlashcardsFromCollection.length === 0) && (
        <StyledMessage>
          No flashcards in this collection found. Add some new!
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

const StyledSuccessMessage = styled.p`
  font: var(--main-headline);
  text-align: center;
  color: var(--primary-green);
  padding: 0 30px 50px 30px;
`;

const FlashcardStackWrapper = styled.div`
  margin: 0 auto;
  width: 90vw;
  height: 218px;
  max-width: 500px;
  position: relative;

  @media (min-width: 768px) {
    min-height: 300px;
    max-height: 400px;
  }
`;

const FlashcardStackShadow = styled.div`
  margin: 0 auto;
  width: 90vw;
  height: 218px;
  max-width: 500px;
  position: absolute;
  border-radius: 10px;

  @media (min-width: 768px) {
    min-height: 300px;
    max-height: 400px;
  }
`;

const SecondFlashcardWrapper = styled(FlashcardStackShadow)`
  top: 8px;
  left: 8px;
  background-color: var(--secondary-light-grey);
`;

const ThirdFlashcardWrapper = styled(FlashcardStackShadow)`
  top: 16px;
  left: -8px;
  background-color: var(--secondary-grey);
`;

const SecondFlashcardOpacity = styled(FlashcardStackShadow)`
  top: 8px;
  left: 8px;
  background-color: var(--secondary-light-grey);
  opacity: 0.6;
`;

const ThirdFlashcardOpacity = styled(FlashcardStackShadow)`
  top: 16px;
  left: -8px;
  background-color: var(--secondary-grey);
  opacity: 0.6;
`;
