import { useRouter } from "next/router";
import styled from "styled-components";
import RegularButton from "@/components/Buttons/RegularButton";
import ButtonWrapper from "@/components/Buttons/ButtonWrapper";
import { useState } from "react";

export default function TrainingCollectionPage({
  getAllFlashcardsFromCollection,
}) {
  const router = useRouter();
  const { id } = router.query;

  const [isCancel, setIsCancel] = useState(false);

  function toggleCancel() {
    setIsCancel(!isCancel);
  }

  const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);

  const collectionTitle = allFlashcardsFromCollection?.[0]?.collectionTitle;
  const collectionColor = allFlashcardsFromCollection?.[0]?.collectionColor;

  function getNineRandomFlashcards() {
    if (allFlashcardsFromCollection.length < 9) {
      return null;
    }
    const randomFlashcards = [];
    const usedIndices = [];

    while (randomFlashcards.length < 9) {
      const randomIndex = Math.floor(
        Math.random() * allFlashcardsFromCollection.length
      );
      if (!usedIndices.includes(randomIndex)) {
        randomFlashcards.push(allFlashcardsFromCollection[randomIndex]);
        usedIndices.push(randomIndex);
      }
    }

    return randomFlashcards;
  }

  const nineRandomFlashcards = getNineRandomFlashcards();

  const memoryQuestions = nineRandomFlashcards.map((flashcard) => {
    return {
      id: flashcard.id,
      content: flashcard.question,
      type: "question",
    };
  });

  const memoryAnswers = nineRandomFlashcards.map((flashcard) => {
    return {
      id: flashcard.id,
      content: flashcard.answer,
      type: "answer",
    };
  });

  const memoryCards = memoryQuestions.concat(memoryAnswers);

  function shuffleCards(cards) {
    return cards.sort(() => Math.random() - 0.5);
  }

  const shuffledMemoryCards = shuffleCards(memoryCards);

  console.log(shuffledMemoryCards);

  return (
    <>
      {allFlashcardsFromCollection.length < 9 && (
        <StyledMessage>
          You need at least 9 flashcards in your collection to play the memory
          game. <br /> Add flashcards to play.
        </StyledMessage>
      )}
      {allFlashcardsFromCollection.length >= 9 && (
        <>
          <StyledHeadline>{collectionTitle}</StyledHeadline>
          <StyledSubheading>Gaming Mode</StyledSubheading>

          <FlashcardMemoryGrid>
            {shuffledMemoryCards.map((card, index) => (
              <li key={index}>
                <MemoryCard $collectionColor={collectionColor}>
                  <MemoryCardContent>{card.content}</MemoryCardContent>
                </MemoryCard>
              </li>
            ))}
          </FlashcardMemoryGrid>

          <CancelContainer>
            {!isCancel && (
              <RegularButton
                type="button"
                onClick={toggleCancel}
                variant="confirm"
              >
                Cancel Game
              </RegularButton>
            )}

            {isCancel && (
              <>
                <p>Are you sure you want to cancel the game?</p>
                <ButtonWrapper>
                  <RegularButton
                    type="button"
                    onClick={() => {
                      router.push("/gaming/");
                    }}
                    variant="warning"
                  >
                    Yes
                  </RegularButton>
                  <RegularButton
                    type="button"
                    onClick={toggleCancel}
                    variant="confirm"
                  >
                    No
                  </RegularButton>
                </ButtonWrapper>
              </>
            )}
          </CancelContainer>
        </>
      )}
    </>
  );
}

const FlashcardMemoryGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 10px;
  list-style: none;
`;

const MemoryCard = styled.li`
  list-style: none;
  width: 105px;
  height: 60px;
  background-color: ${({ $collectionColor }) => $collectionColor};
  font-size: 12px;
  padding: 5px;
`;

const MemoryCardContent = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const StyledMessage = styled.p`
  text-align: center;
  font-size: 1.3rem;
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

const CancelContainer = styled.section`
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
