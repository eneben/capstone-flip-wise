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

  return (
    <>
      <StyledHeadline>{headline}</StyledHeadline>
      <StyledSubheading>{subheading}</StyledSubheading>
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
              modeSelection={modeSelection}
              onIncreaseFlashcardLevel={handleIncreaseFlashcardLevel}
              onDecreaseFlashcardLevel={handleDecreaseFlashcardLevel}
            />
          );
        })}
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
