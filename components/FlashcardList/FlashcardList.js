import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";

export default function FlashcardList({
  headline,
  subheading,
  flashcards,
  handleToggleCorrect,
  handleDeleteFlashcard,
  changeCurrentFlashcard,
  changeActionMode,
  collectionColor,
  modeSelection,
  handleIncreaseFlashcardLevel,
  handleDecreaseFlashcardLevel,
}) {
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

  function sortFlashcardsById(flashcards) {
    return flashcards.sort((a, b) => {
      return a.id - b.id;
    });
  }

  let sortedFlashcards;
  if (modeSelection === "training") {
    sortedFlashcards = sortFlashcardsByLevel(flashcards);
  } else {
    sortedFlashcards = sortFlashcardsById(flashcards);
  }

  function areAllCardsLearned(flashcards) {
    return flashcards.length > 0 && flashcards[0].level === 5;
  }

  const allLearned =
    modeSelection === "training" && areAllCardsLearned(sortedFlashcards);

  const currentFlashcard = modeSelection === "training" && sortedFlashcards[0];
  const nextFlashcard = modeSelection === "training" && sortedFlashcards[1];

  return (
    <>
      <StyledHeadline>{headline}</StyledHeadline>
      <StyledSubheading>{subheading}</StyledSubheading>

      {allLearned && (
        <StyledSuccessMessage>
          You have trained all flashcards up to the last level, BrainStack
          Champion! <span aria-label="party-popper-emoji">🎉</span>
        </StyledSuccessMessage>
      )}

      <FlashcardListWrapper>
        {modeSelection === "learning" &&
          sortedFlashcards.map((flashcard) => {
            return (
              <Flashcard
                collectionColor={collectionColor}
                handleDeleteFlashcard={handleDeleteFlashcard}
                key={flashcard.id}
                flashcard={flashcard}
                onToggleCorrect={handleToggleCorrect}
                changeCurrentFlashcard={changeCurrentFlashcard}
                changeActionMode={changeActionMode}
                modeSelection={modeSelection}
                onIncreaseFlashcardLevel={handleIncreaseFlashcardLevel}
                onDecreaseFlashcardLevel={handleDecreaseFlashcardLevel}
              />
            );
          })}

        {modeSelection === "training" && (
          <FlashcardStackWrapper>
            <FlashcardStackShadow2 $collectionColor={collectionColor} />
            <FlashcardStackShadow1 $collectionColor={collectionColor}>
              <Flashcard
                collectionColor={collectionColor}
                handleDeleteFlashcard={handleDeleteFlashcard}
                flashcard={nextFlashcard}
                onToggleCorrect={handleToggleCorrect}
                changeCurrentFlashcard={changeCurrentFlashcard}
                changeActionMode={changeActionMode}
                modeSelection={modeSelection}
                onIncreaseFlashcardLevel={handleIncreaseFlashcardLevel}
                onDecreaseFlashcardLevel={handleDecreaseFlashcardLevel}
              />
            </FlashcardStackShadow1>
            <Flashcard
              collectionColor={collectionColor}
              handleDeleteFlashcard={handleDeleteFlashcard}
              flashcard={currentFlashcard}
              onToggleCorrect={handleToggleCorrect}
              changeCurrentFlashcard={changeCurrentFlashcard}
              changeActionMode={changeActionMode}
              modeSelection={modeSelection}
              onIncreaseFlashcardLevel={handleIncreaseFlashcardLevel}
              onDecreaseFlashcardLevel={handleDecreaseFlashcardLevel}
            />
          </FlashcardStackWrapper>
        )}
      </FlashcardListWrapper>
    </>
  );
}

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
  border: var(--border-thickness) solid
    ${({ $collectionColor }) => $collectionColor};

  @media (min-width: 768px) {
    min-height: 300px;
    max-height: 400px;
  }
`;

const FlashcardStackShadow1 = styled(FlashcardStackShadow)`
  top: 8px;
  left: 8px;
  background-color: var(--secondary-light-grey);
`;

const FlashcardStackShadow2 = styled(FlashcardStackShadow)`
  top: 16px;
  left: -8px;
  background-color: var(--secondary-grey);
`;
