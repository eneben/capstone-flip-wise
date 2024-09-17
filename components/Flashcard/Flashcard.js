import styled from "styled-components";
import { useEffect, useState } from "react";
import { findContrastColor } from "color-contrast-finder";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import Delete from "@/public/icons/Delete.svg";
import Edit from "@/public/icons/Edit.svg";
import RoundButton from "../Buttons/RoundButton";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";

export default function Flashcard({
  flashcard,
  onToggleCorrect,
  handleDeleteFlashcard,
  changeCurrentFlashcard,
  changeActionMode,
  collectionColor,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [cardPosition, setCardPosition] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const minimumSwipeDistance = 100;

  const {
    question,
    answer,
    collectionTitle: collection,
    id,
    isCorrect,
  } = flashcard;

  useEffect(() => {
    if (isSwiping) {
      const distance = touchStartX - touchEndX;
      const isSwipeRight = distance < 0;
      const isSwipeLeft = distance > 0;

      if (Math.abs(distance) > minimumSwipeDistance) {
        const timeout = setTimeout(() => {
          if (isSwipeRight && !isCorrect) {
            onToggleCorrect(flashcard.id);
          } else if (isSwipeLeft && isCorrect) {
            onToggleCorrect(flashcard.id);
          }
          resetSwipe();
        }, 300);

        return () => clearTimeout(timeout);
      } else {
        resetSwipe();
      }
    }
  }, [
    isSwiping,
    touchEndX,
    touchStartX,
    isCorrect,
    onToggleCorrect,
    flashcard.id,
  ]);

  function handleTouchStart(event) {
    if (!showAnswer) return;
    setTouchStartX(event.targetTouches[0].clientX);
  }

  function handleTouchMove(event) {
    if (!showAnswer) return;
    const touchX = event.targetTouches[0].clientX;
    setCardPosition(touchX - touchStartX);
    setTouchEndX(touchX);
  }

  function handleTouchEnd() {
    if (!showAnswer) {
      setCardPosition(0);
      return;
    }
    setIsSwiping(true);
  }

  function resetSwipe() {
    setIsSwiping(false);
    setCardPosition(0);
    setTouchStartX(0);
    setTouchEndX(0);
  }

  function handleShowAnswer() {
    setShowAnswer(!showAnswer);
  }

  function toggleDeleteConfirmation(event) {
    event.stopPropagation();
    setIsDelete(!isDelete);
  }

  function setEditWithoutFlip(event) {
    event.stopPropagation();
    changeActionMode("edit");
    changeCurrentFlashcard(flashcard);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const contrastOptions = {
    color: collectionColor,
    threshold: 0.5,
    highColor: "#000",
    lowColor: "#fff",
  };

  const titleColor = findContrastColor(contrastOptions);

  return (
    <CardContainer
      onClick={handleShowAnswer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <StyledFlashcard
        $showAnswer={showAnswer}
        $cardPosition={cardPosition}
        $isSwiping={isSwiping}
        $swipeDirection={touchEndX > touchStartX ? "right" : "left"}
      >
        {isDelete && (
          <>
            <CardFront $collectionColor={collectionColor}>
              <StyledDeleteConfirmationDialogContainer>
                <DeleteConfirmationDialog
                  onDeleteFlashcard={handleDeleteFlashcard}
                  toggleDeleteConfirmation={toggleDeleteConfirmation}
                  id={id}
                  variant="flashcard"
                />
              </StyledDeleteConfirmationDialogContainer>
            </CardFront>
            <CardBack $collectionColor={collectionColor}>
              <StyledDeleteConfirmationDialogContainer>
                <DeleteConfirmationDialog
                  onDeleteFlashcard={handleDeleteFlashcard}
                  toggleDeleteConfirmation={toggleDeleteConfirmation}
                  id={id}
                  variant="flashcard"
                />
              </StyledDeleteConfirmationDialogContainer>
            </CardBack>
          </>
        )}

        {!isDelete && (
          <>
            <CardFront $collectionColor={collectionColor}>
              <CollectionTitle
                $collectionColor={collectionColor}
                $titleColor={titleColor}
              >
                {collection}
              </CollectionTitle>

              <StyledEditButtonContainer>
                <RoundButton
                  content={<Edit />}
                  onClick={setEditWithoutFlip}
                  type="button"
                  variant="edit"
                />
              </StyledEditButtonContainer>

              <StyledDeleteButtonContainer>
                <RoundButton
                  content={<Delete />}
                  onClick={toggleDeleteConfirmation}
                  type="button"
                  variant="delete"
                />
              </StyledDeleteButtonContainer>

              <Question>{question}</Question>

              {isCorrect && (
                <StyledCorrectIcon>
                  <MarkAsCorrect />
                </StyledCorrectIcon>
              )}
            </CardFront>
            <CardBack $collectionColor={collectionColor}>
              <StyledDeleteButtonContainer>
                <RoundButton
                  content={<Delete />}
                  onClick={toggleDeleteConfirmation}
                  type="button"
                  variant="delete"
                />
              </StyledDeleteButtonContainer>
              <Answer>{answer}</Answer>

              <StyledMarkAsButtonContainer>
                <RoundButton
                  content={isCorrect ? <MarkAsIncorrect /> : <MarkAsCorrect />}
                  onClick={() => onToggleCorrect(id)}
                  type="button"
                  variant={isCorrect ? "markAsIncorrect" : "markAsCorrect"}
                />
              </StyledMarkAsButtonContainer>
            </CardBack>
          </>
        )}
      </StyledFlashcard>
    </CardContainer>
  );
}

const CardContainer = styled.li`
  perspective: 1000px;
`;

const StyledFlashcard = styled.article`
  width: 90vw;
  height: auto;
  min-height: 218px;
  max-width: 500px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s, transform 0.6s;
  transform: ${({ $showAnswer, $cardPosition, $isSwiping, $swipeDirection }) =>
    $showAnswer
      ? `rotateY(180deg) translateX(${$cardPosition}px)`
      : `rotateY(0deg) translateX(${$cardPosition}px)`};
  opacity: ${({ $isSwiping }) => ($isSwiping ? 0 : 1)};
  ${({ $isSwiping, $swipeDirection }) =>
    $isSwiping
      ? $swipeDirection === "right"
        ? `transform: translateX(100vw);`
        : `transform: translateX(-100vw);`
      : ""};
  cursor: pointer;

  @media (min-width: 768px) {
    min-height: 300px;
    transition: transform 0.8s;
  }
`;

const CardFace = styled.div`
  display: grid;
  grid-template-columns: var(--grid-columns-card-and-title);
  grid-template-rows: var(--grid-rows-card-and-title);
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  border: var(--border-thickness) solid
    ${({ $collectionColor }) => $collectionColor};
`;

const CardFront = styled(CardFace)`
  background-color: #fff;
`;

const CardBack = styled(CardFace)`
  background-color: var(--secondary-light-grey);
  transform: rotateY(180deg);
`;

const CollectionTitle = styled.p`
  font: var(--collection-title);
  display: inline-block;
  color: ${({ $titleColor }) => $titleColor};
  background-color: ${({ $collectionColor }) => $collectionColor};
  padding: 5px 12px 7px 10px;
  grid-column: 1 / 6;
  grid-row: 1 / 2;
  justify-self: start;
  align-self: start;
  border-top-left-radius: 6px;
  border-bottom-right-radius: 10px;
`;

const Answer = styled.p`
  font: var(--question-answer);
  padding: 10px;
  grid-column: 1 / 8;
  grid-row: 2 / 3;
  align-self: center;

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Question = styled.h3`
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

const StyledCorrectIcon = styled.div`
  color: var(--primary-green);
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 7 / 8;
  grid-row: 3 / 4;
`;

const RoundButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledEditButtonContainer = styled(RoundButtonContainer)`
  grid-column: 6 / 7;
  grid-row: 1 / 2;
`;

const StyledDeleteButtonContainer = styled(RoundButtonContainer)`
  grid-column: 7 / 8;
  grid-row: 1 / 2;
`;

const StyledMarkAsButtonContainer = styled(RoundButtonContainer)`
  grid-column: 7 / 8;
  grid-row: 3 / 4;
`;

const StyledDeleteConfirmationDialogContainer = styled.div`
  grid-column: 1 / 8;
  grid-row: 2 / 4;

  @media (min-width: 768px) {
    padding-top: 40px;
  }
`;
