import { useRouter } from "next/router";
import styled from "styled-components";
import RegularButton from "@/components/Buttons/RegularButton";
import ButtonWrapper from "@/components/Buttons/ButtonWrapper";
import { useState, useEffect } from "react";
import { uid } from "uid";

export default function TrainingCollectionPage({
  getAllFlashcardsFromCollection,
}) {
  const router = useRouter();
  const { id } = router.query;

  const [isCancel, setIsCancel] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [shuffledMemoryCards, setShuffledMemoryCards] = useState([]);

  const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);

  const collectionTitle = allFlashcardsFromCollection?.[0]?.collectionTitle;
  const collectionColor = allFlashcardsFromCollection?.[0]?.collectionColor;

  function toggleCancel() {
    setIsCancel(!isCancel);
  }

  function toggleCardFlip(cardId) {
    setFlippedCards({
      ...flippedCards,
      [cardId]: !flippedCards[cardId],
    });
  }

  function getNineRandomFlashcards() {
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

  function shuffleCards(cards) {
    return cards.sort(() => Math.random() - 0.5);
  }

  const nineRandomFlashcards = getNineRandomFlashcards();

  useEffect(() => {
    if (allFlashcardsFromCollection < 9) {
      return null;
    }
    if (allFlashcardsFromCollection.length >= 9) {
      const memoryQuestions = nineRandomFlashcards.map((flashcard) => {
        return {
          pairing: flashcard.id,
          content: flashcard.question,
          type: "question",
          id: uid(),
        };
      });

      const memoryAnswers = nineRandomFlashcards.map((flashcard) => {
        return {
          pairing: flashcard.id,
          content: flashcard.answer,
          type: "answer",
          id: uid(),
        };
      });

      const memoryCards = [...memoryQuestions, ...memoryAnswers];

      setShuffledMemoryCards(shuffleCards(memoryCards));
    }
  }, []);

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
            {shuffledMemoryCards.map((card) => (
              <CardContainer
                key={card.id}
                onClick={() => toggleCardFlip(card.id)}
              >
                <MemoryCard $isFlipped={flippedCards[card.id]}>
                  <MemoryCardBack $collectionColor={collectionColor} />
                  <MemoryCardFront>
                    <MemoryCardContent>{card.content}</MemoryCardContent>
                  </MemoryCardFront>
                </MemoryCard>
              </CardContainer>
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

const CardContainer = styled.li`
  perspective: 1000px;
`;

const MemoryCard = styled.article`
  width: 105px;
  height: 60px;
  font-size: 12px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ $isFlipped }) =>
    $isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const MemoryCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  backface-visibility: hidden;
  background-color: ${({ $collectionColor }) => $collectionColor};
`;

const MemoryCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  backface-visibility: hidden;
  background-color: #add8e6;
  transform: rotateY(180deg);
`;

const MemoryCardContent = styled.p`
  padding: 5px;
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
