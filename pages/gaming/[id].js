import { useRouter } from "next/router";
import styled from "styled-components";
import RegularButton from "@/components/Buttons/RegularButton";
import RoundButton from "@/components/Buttons/RoundButton";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import ButtonWrapper from "@/components/Buttons/ButtonWrapper";
import { useState, useEffect, useMemo, useCallback } from "react";
import { uid } from "uid";

export default function TrainingCollectionPage({
  getAllFlashcardsFromCollection,
}) {
  const router = useRouter();
  const { id } = router.query;

  const [isCancel, setIsCancel] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [memoryCards, setMemoryCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  console.log("selectedCardId", selectedCardId);

  const allFlashcardsFromCollection = useMemo(
    () => getAllFlashcardsFromCollection(id),
    [id, getAllFlashcardsFromCollection]
  );

  const collectionTitle = allFlashcardsFromCollection?.[0]?.collectionTitle;
  const collectionColor = allFlashcardsFromCollection?.[0]?.collectionColor;

  function toggleCancel() {
    setIsCancel((prevIsCancel) => !prevIsCancel);
  }

  function toggleCardFlip(cardId) {
    setFlippedCards((prevFlippedCards) => ({
      ...prevFlippedCards,
      [cardId]: !prevFlippedCards[cardId],
    }));
  }

  function handleCardEnlargement(cardId) {
    setSelectedCardId((selectedCardId) =>
      selectedCardId === cardId ? null : cardId
    );
  }

  const setupMemoryCards = useCallback(() => {
    if (allFlashcardsFromCollection.length < 9) return;

    const shuffledFlashcards = [...allFlashcardsFromCollection].sort(
      () => Math.random() - 0.5
    );
    const nineRandomFlashcards = shuffledFlashcards.slice(0, 9);

    const newMemoryCards = nineRandomFlashcards.flatMap((flashcard) => [
      {
        pairing: flashcard.id,
        content: flashcard.question,
        type: "question",
        id: uid(),
      },
      {
        pairing: flashcard.id,
        content: flashcard.answer,
        type: "answer",
        id: uid(),
      },
    ]);

    setMemoryCards(newMemoryCards.sort(() => Math.random() - 0.5));
  }, [allFlashcardsFromCollection]);

  useEffect(() => {
    setupMemoryCards();
  }, [setupMemoryCards]);

  if (allFlashcardsFromCollection.length < 9) {
    return (
      <>
        <StyledHeadline>{collectionTitle}</StyledHeadline>
        <StyledSubheading>Gaming Mode</StyledSubheading>
        <StyledMessage>
          Unfortunately the memory is not available in this collection. You need
          at least 9 flashcards in your collection to play the memory game.
          <br /> Add flashcards to play.
        </StyledMessage>
      </>
    );
  }

  const selectedCard = memoryCards.find((card) => card.id === selectedCardId);

  return (
    <>
      {allFlashcardsFromCollection.length >= 9 && (
        <>
          <StyledHeadline>{collectionTitle}</StyledHeadline>
          <StyledSubheading>Gaming Mode</StyledSubheading>

          <StyledFlashcardMemoryGrid>
            {memoryCards.map((card) => (
              <StyledCardContainer
                key={card.id}
                onClick={() => {
                  toggleCardFlip(card.id);
                  handleCardEnlargement(card.id);
                }}
              >
                <StyledMemoryCard $isFlipped={flippedCards[card.id]}>
                  <StyledMemoryCardBack $collectionColor={collectionColor} />
                  <StyledMemoryCardFront>
                    <StyledMemoryCardContent>
                      {card.content}
                    </StyledMemoryCardContent>
                  </StyledMemoryCardFront>
                </StyledMemoryCard>
              </StyledCardContainer>
            ))}
          </StyledFlashcardMemoryGrid>

          <StyledCancelContainer>
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
          </StyledCancelContainer>

          {selectedCardId && (
            <StyledOutgreyContainer onClick={() => setSelectedCardId(null)}>
              <StyledLargeFlashcard $collectionColor={collectionColor}>
                <StyledCloseButtonContainer>
                  <RoundButton
                    onClick={() => setSelectedCardId(null)}
                    type="button"
                    variant="edit"
                  >
                    <MarkAsIncorrect />
                    {/* Hier stattdessen anderes Icon einfügen, z.B. zwei Pfeile wie bei Vollbild beenden */}
                  </RoundButton>
                </StyledCloseButtonContainer>
                <StyledSelectedCardContent>
                  {selectedCard.content}
                </StyledSelectedCardContent>
              </StyledLargeFlashcard>
            </StyledOutgreyContainer>
          )}
        </>
      )}
    </>
  );
}

const StyledFlashcardMemoryGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 10px;
  list-style: none;
`;

const StyledCardContainer = styled.li`
  perspective: 1000px;
`;

const StyledMemoryCard = styled.article`
  width: 105px;
  height: 60px;
  font-size: 12px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ $isFlipped }) =>
    $isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const StyledMemoryCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  backface-visibility: hidden;
  background-color: ${({ $collectionColor }) => $collectionColor};
`;

const StyledMemoryCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  backface-visibility: hidden;
  background-color: #add8e6;
  transform: rotateY(180deg);
`;

const StyledMemoryCardContent = styled.p`
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

const StyledCancelContainer = styled.section`
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledOutgreyContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: #00000088;
`;

const StyledLargeFlashcard = styled.article`
  width: 90vw;
  height: auto;
  min-height: 218px;
  max-width: 500px;
  border-radius: 10px;
  background-color: #fff;
  opacity: 1;
  z-index: 2;
  display: grid;
  grid-template-columns: var(--grid-columns-card-and-title);
  grid-template-rows: var(--grid-rows-card-and-title);
  border: var(--border-thickness) solid
    ${({ $collectionColor }) => $collectionColor};

  @media (min-width: 768px) {
    min-height: 300px;
  }
`;

const StyledCloseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 7 / 8;
  grid-row: 1 / 2;
`;

const StyledSelectedCardContent = styled.p`
  font: var(--question-answer);
  padding: 10px;
  white-space: normal;
  grid-column: 1 / 8;
  grid-row: 2 / 3;
  align-self: center;

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;
