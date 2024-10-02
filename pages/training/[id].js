import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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
  handleFirstClick,
}) {
  const router = useRouter();
  const { id } = router.query;

  const [sortedFlashcards, setSortedFlashcards] = useState([]);

  useEffect(() => {
    if (!id) return;
    const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);
    setSortedFlashcards(sortFlashcardsByLevel(allFlashcardsFromCollection));
  }, [id, getAllFlashcardsFromCollection]);

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

  function areAllCardsLearned(flashcards) {
    return flashcards.length > 0 && flashcards[0].level === 5;
  }

  const allLearned = areAllCardsLearned(sortedFlashcards);

  return (
    <>
      {sortedFlashcards.length > 0 && (
        <>
          <OverflowWrapper>
            <StyledHeadline>
              {sortedFlashcards[0]?.collectionTitle}
            </StyledHeadline>
            <StyledSubheading>Training Mode</StyledSubheading>

            {allLearned && (
              <StyledSuccessMessage>
                You have trained all flashcards up to the last level, BrainStack
                Champion! <span aria-label="party-popper-emoji">🎉</span>
              </StyledSuccessMessage>
            )}

            <FlascardStackWrapper>
              <FlashcardStackShadow2 />
              <FlashcardStackShadow1 />
              <FlashcardListWrapper>
                {sortedFlashcards.toReversed().map((flashcard) => (
                  <Flashcard
                    key={flashcard.id}
                    collectionColor={flashcard?.collectionColor}
                    handleDeleteFlashcard={handleDeleteFlashcard}
                    flashcard={flashcard}
                    onToggleCorrect={handleToggleCorrect}
                    changeCurrentFlashcard={changeCurrentFlashcard}
                    changeActionMode={changeActionMode}
                    modeSelection="training"
                    onIncreaseFlashcardLevel={handleIncreaseFlashcardLevel}
                    onDecreaseFlashcardLevel={handleDecreaseFlashcardLevel}
                    onFirstClick={handleFirstClick}
                  />
                ))}
              </FlashcardListWrapper>
            </FlascardStackWrapper>
          </OverflowWrapper>
        </>
      )}
      {(!sortedFlashcards || sortedFlashcards.length === 0) && (
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

const OverflowWrapper = styled.div`
  position: fixed;
  overflow: hidden;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const FlascardStackWrapper = styled.div`
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

const FlashcardListWrapper = styled.ul`
  display: grid;
  flex-direction: column;
  list-style: none;
  align-items: center;
`;
