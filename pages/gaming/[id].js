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

  const [flippedCards, setFlippedCards] = useState([]);
  const [memoryCards, setMemoryCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [cardStatus, setCardStatus] = useState({});
  const [gameStatus, setGameStatus] = useState("playing");

  function startNewGame() {
    setMemoryCards([]);
    setCardStatus({});
    setGameStatus("playing");
    setupMemoryCards();
  }

  const allFlashcardsFromCollection = useMemo(
    () => getAllFlashcardsFromCollection(id),
    [id, getAllFlashcardsFromCollection]
  );

  const collectionTitle = allFlashcardsFromCollection?.[0]?.collectionTitle;
  const collectionColor = allFlashcardsFromCollection?.[0]?.collectionColor;

  function handleCardFlip(cardId) {
    setFlippedCards((prevFlippedCards) => {
      return [...prevFlippedCards, cardId];
    });
  }

  function handleCardEnlargement(cardId) {
    setSelectedCardId((selectedCardId) =>
      selectedCardId === cardId ? null : cardId
    );
  }

  function handleCardClick(cardId) {
    if (cardStatus[cardId] === "hidden") {
      return;
    }

    if (flippedCards.length === 2 && !flippedCards.includes(cardId)) {
      processCardMatch(flippedCards);
    }

    if (flippedCards.includes(cardId)) {
      handleCardEnlargement(cardId);
    } else {
      handleCardFlip(cardId);
      handleCardEnlargement(cardId);
    }
  }

  const checkPairing = useCallback(
    (flippedCards) => {
      const [firstId, secondId] = flippedCards;
      const firstCard = memoryCards.find((card) => card.id === firstId);
      const secondCard = memoryCards.find((card) => card.id === secondId);

      if (firstCard.pairing === secondCard.pairing) {
        setCardStatus((prevCardStatus) => ({
          ...prevCardStatus,
          [firstId]: "matching",
          [secondId]: "matching",
        }));
      } else {
        setCardStatus((prevCardStatus) => ({
          ...prevCardStatus,
          [firstId]: "mismatching",
          [secondId]: "mismatching",
        }));
      }
    },
    [memoryCards, setCardStatus]
  );

  function checkWinning() {
    const allCardStatusHidden = memoryCards.every(
      (card) =>
        cardStatus[card.id] === "hidden" || flippedCards.includes(card.id)
    );

    if (allCardStatusHidden) {
      setGameStatus("won");
    }
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkPairing(flippedCards);
    }
  }, [flippedCards, selectedCardId, checkPairing]);

  function processCardMatch(flippedCards) {
    const [firstId, secondId] = flippedCards;
    const firstCard = memoryCards.find((card) => card.id === firstId);
    const secondCard = memoryCards.find((card) => card.id === secondId);

    if (firstCard.pairing === secondCard.pairing) {
      setCardStatus((prevCardStatus) => ({
        ...prevCardStatus,
        [firstId]: "hidden",
        [secondId]: "hidden",
      }));
    } else {
      setCardStatus((prevCardStatus) => ({
        ...prevCardStatus,
        [firstId]: "flipped",
        [secondId]: "flipped",
      }));
    }

    setFlippedCards([]);
  }

  const setupMemoryCards = useCallback(() => {
    if (allFlashcardsFromCollection.length < 9) return;

    setFlippedCards([]);

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

          {gameStatus !== "won" && (
            <>
              <StyledFlashcardMemoryGrid>
                {memoryCards.map((card) => (
                  <StyledCardContainer
                    key={card.id}
                    onClick={() => {
                      handleCardClick(card.id);
                    }}
                    $status={cardStatus[card.id]}
                  >
                    <StyledMemoryCard
                      $isFlipped={flippedCards.includes(card.id)}
                    >
                      <StyledMemoryCardBack
                        $collectionColor={collectionColor}
                      />
                      <StyledMemoryCardFront $status={cardStatus[card.id]}>
                        <StyledMemoryCardContent>
                          {card.content}
                        </StyledMemoryCardContent>
                      </StyledMemoryCardFront>
                    </StyledMemoryCard>
                  </StyledCardContainer>
                ))}
              </StyledFlashcardMemoryGrid>

              <StyledCancelContainer>
                {gameStatus === "playing" && (
                  <RegularButton
                    type="button"
                    onClick={() => setGameStatus("cancel")}
                    variant="confirm"
                  >
                    Cancel Game
                  </RegularButton>
                )}

                {gameStatus === "cancel" && (
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
                        onClick={() => setGameStatus("playing")}
                        variant="confirm"
                      >
                        No
                      </RegularButton>
                    </ButtonWrapper>
                  </>
                )}
              </StyledCancelContainer>

              {selectedCardId && (
                <StyledOutgreyContainer
                  onClick={() => {
                    setSelectedCardId(null);
                    checkWinning();
                  }}
                >
                  <StyledLargeFlashcard $collectionColor={collectionColor}>
                    <StyledCloseButtonContainer>
                      <RoundButton
                        onClick={() => {
                          setSelectedCardId(null);
                          checkWinning();
                        }}
                        type="button"
                        variant="edit"
                      >
                        <MarkAsIncorrect />
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

          {gameStatus === "won" && (
            <StyledWinningSection>
              <StyledSuccessMessage>
                YAY, YOU WON! <span aria-label="party-popper-emoji">🎉</span>
              </StyledSuccessMessage>

              <RegularButton
                type="button"
                onClick={startNewGame}
                variant="confirm"
              >
                New Game
              </RegularButton>
              <RegularButton
                type="button"
                onClick={() => {
                  router.push("/");
                }}
                variant="confirm"
              >
                Home
              </RegularButton>
            </StyledWinningSection>
          )}
        </>
      )}
    </>
  );
}

const StyledFlashcardMemoryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 10px;
  margin: 0 auto;
  max-width: 676.25px;
`;

const StyledCardContainer = styled.button`
  perspective: 1000px;
  border: none;
  visibility: ${({ $status }) => ($status === "hidden" ? "hidden" : "visible")};
`;

const StyledMemoryCard = styled.article`
  min-width: 105px;
  min-height: 60px;
  max-height: 125px;
  aspect-ratio: 1.75 / 1;
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
  background-color: ${({ $status }) =>
    $status === "matching"
      ? "#2a9d8f"
      : $status === "mismatching"
      ? "#e76f51"
      : "#3ca8dc"};
  transform: rotateY(180deg);
  padding: 5px;

  @media (min-width: 768px) {
    padding: 10px;
  }
`;

const StyledMemoryCardContent = styled.p`
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: left;
  font-size: calc(6px + 2vw);

  @media (min-width: 615px) {
    -webkit-line-clamp: 4;
    font-size: calc(4px + 2vw);
  }

  @media (min-width: 768px) {
    font-size: 18.3px;
  }
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
  padding-bottom: 30px;
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

const StyledWinningSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const StyledSuccessMessage = styled.p`
  font: var(--main-headline);
  text-align: center;
  color: var(--primary-green);
  padding: 30px;
`;
