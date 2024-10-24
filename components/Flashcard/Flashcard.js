import styled from "styled-components";
import { useState, useEffect } from "react";
import { findContrastColor } from "color-contrast-finder";
import { motion, useMotionValue, useTransform } from "framer-motion";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import Delete from "@/public/icons/Delete.svg";
import Edit from "@/public/icons/Edit.svg";
import RoundButton from "../Buttons/RoundButton";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import LevelBar from "../LevelBar/LevelBar";
import BubbleAnimation from "../BubbleAnimation/BubbleAnimation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Flashcard({
  flashcard,
  handleDeleteFlashcard,
  changeCurrentFlashcard,
  changeActionMode,
  collectionColor,
  modeSelection,
  onIncreaseFlashcardLevel,
  onDecreaseFlashcardLevel,
  onToggleCorrect,
  onFirstClick,
  handleOpenEnlargeImage,
}) {
  const { data: session } = useSession();

  const [showAnswer, setShowAnswer] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    question,
    answer,
    collectionTitle: collection,
    _id: id,
    isCorrect,
    level,
    imageUrl,
  } = flashcard;

  const motionValue = useMotionValue(0);
  const rotateValue = useTransform(motionValue, [-300, 300], [-100, 100]);
  const opacityValue = useTransform(
    motionValue,
    [-150, -75, 0, 75, 150],
    [0, 0.5, 1, 0, 0]
  );

  function handleSwipeAnimation(direction) {
    if (isAnimating) return;
    setSwipeDirection(direction);
    setIsAnimating(true);
  }

  useEffect(() => {
    let timeoutId;
    if (isAnimating) {
      timeoutId = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAnimating]);

  function resetFlashcardStates() {
    setShowAnswer(false);
    setIsDelete(false);
    setIsVisible(true);
  }

  function handleDragEnd() {
    if (!showAnswer || isAnimating) return;
    const x = motionValue.get();

    if (x > 30) {
      onIncreaseFlashcardLevel(id);
      handleSwipeAnimation("right");
      resetFlashcardStates();
    } else if (x < -30) {
      onDecreaseFlashcardLevel(id);
      handleSwipeAnimation("left");
      resetFlashcardStates();
    }
  }

  function handleShowAnswer() {
    if (!isDelete) {
      setShowAnswer((prevShowAnswer) => !prevShowAnswer);
    }
  }

  function toggleDeleteConfirmation(event) {
    event.stopPropagation();
    setIsDelete((prevIsDelete) => !prevIsDelete);
  }

  function setEditWithoutFlip(event) {
    event.stopPropagation();
    changeActionMode("edit");
    changeCurrentFlashcard(flashcard);
  }

  function handleMarkAsCorrect(id) {
    onFirstClick();
    onIncreaseFlashcardLevel(id);
  }

  function handleMarkAsInCorrect(id) {
    onFirstClick();
    onDecreaseFlashcardLevel(id);
  }

  const contrastOptions = {
    color: collectionColor,
    threshold: 0.5,
    highColor: "#000",
    lowColor: "#fff",
  };

  const titleColor = findContrastColor(contrastOptions);

  return (
    <>
      {isAnimating && <BubbleAnimation swipeDirection={swipeDirection} />}
      {isVisible && modeSelection === "training" ? (
        <StyledSwipeContainer
          drag={showAnswer ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          style={{
            x: motionValue,
            rotate: rotateValue,
            opacity: opacityValue,
          }}
          onDragEnd={handleDragEnd}
        >
          <CardContainer onClick={handleShowAnswer}>
            <StyledFlashcard $showAnswer={showAnswer}>
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
                        onClick={setEditWithoutFlip}
                        type="button"
                        variant="edit"
                        disabled={!session}
                        grayout={!session}
                      >
                        <Edit />
                      </RoundButton>
                    </StyledEditButtonContainer>
                    <StyledDeleteButtonContainer>
                      <RoundButton
                        onClick={toggleDeleteConfirmation}
                        type="button"
                        variant="delete"
                        disabled={!session}
                        grayout={!session}
                      >
                        <Delete />
                      </RoundButton>
                    </StyledDeleteButtonContainer>

                    <Question>{question}</Question>

                    {modeSelection === "training" && (
                      <LevelBarWrapper>
                        <LevelBar level={level} />
                      </LevelBarWrapper>
                    )}

                    {modeSelection === "learning" && isCorrect && (
                      <StyledCorrectIcon>
                        <MarkAsCorrect />
                      </StyledCorrectIcon>
                    )}
                  </CardFront>

                  <CardBack $collectionColor={collectionColor}>
                    <StyledDeleteButtonContainer>
                      <RoundButton
                        onClick={toggleDeleteConfirmation}
                        type="button"
                        variant="delete"
                        disabled={!session}
                        grayout={!session}
                      >
                        <Delete />
                      </RoundButton>
                    </StyledDeleteButtonContainer>
                    <Answer>{answer}</Answer>

                    {imageUrl && (
                      <StyledImageContainer
                        onClick={(event) => {
                          event.stopPropagation();
                          handleOpenEnlargeImage(imageUrl);
                        }}
                      >
                        <StyledImage
                          src={imageUrl}
                          alt="Flashcard Image"
                          width={90}
                          height={90}
                          priority={true}
                        />
                      </StyledImageContainer>
                    )}

                    {modeSelection === "learning" && (
                      <StyledMarkAsButtonContainer>
                        <RoundButton
                          onClick={() => onToggleCorrect(id)}
                          type="button"
                          variant={
                            isCorrect ? "markAsIncorrect" : "markAsCorrect"
                          }
                          disabled={!session}
                          grayout={!session}
                        >
                          {isCorrect ? <MarkAsIncorrect /> : <MarkAsCorrect />}
                        </RoundButton>
                      </StyledMarkAsButtonContainer>
                    )}

                    {modeSelection === "training" && (
                      <>
                        <StyledIncorrectButtonContainer>
                          <RoundButton
                            onClick={() => {
                              handleMarkAsInCorrect(id);
                            }}
                            type="button"
                            variant={"markAsIncorrect"}
                          >
                            <MarkAsIncorrect />
                          </RoundButton>
                        </StyledIncorrectButtonContainer>
                        <StyledCorrectButtonContainer>
                          <RoundButton
                            onClick={() => {
                              handleMarkAsCorrect(id);
                            }}
                            type="button"
                            variant={"markAsCorrect"}
                          >
                            <MarkAsCorrect />
                          </RoundButton>
                        </StyledCorrectButtonContainer>
                      </>
                    )}
                  </CardBack>
                </>
              )}
            </StyledFlashcard>
          </CardContainer>
        </StyledSwipeContainer>
      ) : (
        <CardContainer onClick={handleShowAnswer}>
          <StyledFlashcard $showAnswer={showAnswer}>
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
                      onClick={setEditWithoutFlip}
                      type="button"
                      variant="edit"
                      disabled={!session}
                      grayout={!session}
                    >
                      <Edit />
                    </RoundButton>
                  </StyledEditButtonContainer>
                  <StyledDeleteButtonContainer>
                    <RoundButton
                      onClick={toggleDeleteConfirmation}
                      type="button"
                      variant="delete"
                      disabled={!session}
                      grayout={!session}
                    >
                      <Delete />
                    </RoundButton>
                  </StyledDeleteButtonContainer>

                  <Question>{question}</Question>

                  {modeSelection === "training" && (
                    <LevelBarWrapper>
                      <LevelBar level={level} />
                    </LevelBarWrapper>
                  )}

                  {modeSelection === "learning" && isCorrect && (
                    <StyledCorrectIcon>
                      <MarkAsCorrect />
                    </StyledCorrectIcon>
                  )}
                </CardFront>

                <CardBack $collectionColor={collectionColor}>
                  <StyledDeleteButtonContainer>
                    <RoundButton
                      onClick={toggleDeleteConfirmation}
                      type="button"
                      variant="delete"
                      disabled={!session}
                      grayout={!session}
                    >
                      <Delete />
                    </RoundButton>
                  </StyledDeleteButtonContainer>
                  <Answer>{answer}</Answer>

                  {imageUrl && (
                    <StyledImageContainer
                      onClick={(event) => {
                        event.stopPropagation();
                        handleOpenEnlargeImage(imageUrl);
                      }}
                    >
                      <StyledImage
                        src={imageUrl}
                        alt="Flashcard Image"
                        width={90}
                        height={90}
                        priority={true}
                      />
                    </StyledImageContainer>
                  )}

                  {modeSelection === "learning" && (
                    <StyledMarkAsButtonContainer>
                      <RoundButton
                        onClick={() => onToggleCorrect(id)}
                        type="button"
                        variant={
                          isCorrect ? "markAsIncorrect" : "markAsCorrect"
                        }
                        disabled={!session}
                        grayout={!session}
                      >
                        {isCorrect ? <MarkAsIncorrect /> : <MarkAsCorrect />}
                      </RoundButton>
                    </StyledMarkAsButtonContainer>
                  )}

                  {modeSelection === "training" && (
                    <>
                      <StyledIncorrectButtonContainer>
                        <RoundButton
                          onClick={() => onDecreaseFlashcardLevel(id)}
                          type="button"
                          variant={"markAsIncorrect"}
                        >
                          <MarkAsIncorrect />
                        </RoundButton>
                      </StyledIncorrectButtonContainer>
                      <StyledCorrectButtonContainer>
                        <RoundButton
                          onClick={() => onIncreaseFlashcardLevel(id)}
                          type="button"
                          variant={"markAsCorrect"}
                        >
                          <MarkAsCorrect />
                        </RoundButton>
                      </StyledCorrectButtonContainer>
                    </>
                  )}
                </CardBack>
              </>
            )}
          </StyledFlashcard>
        </CardContainer>
      )}
    </>
  );
}

const CardContainer = styled.li`
  perspective: 1000px;
`;

const StyledFlashcard = styled.article`
  width: 90vw;
  min-height: 218px;
  max-width: 500px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s, transform 0.6s;
  transform: ${({ $showAnswer }) =>
    $showAnswer ? "rotateY(180deg)" : "rotateY(0deg)"};

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
  grid-column: 1 / 6;
  grid-row: 2 / 3;
  align-self: center;

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const StyledImageContainer = styled.div`
  grid-column: 6 / 8;
  grid-row: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledImage = styled(Image)`
  object-fit: contain;
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

const StyledIncorrectButtonContainer = styled(RoundButtonContainer)`
  grid-column: 6 / 7;
  grid-row: 3 / 4;
`;

const StyledCorrectButtonContainer = styled(RoundButtonContainer)`
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

const LevelBarWrapper = styled.div`
  padding-top: 20px;
  grid-column: 1 / 8;
  grid-row: 3 / 4;
`;

const StyledSwipeContainer = styled(motion.div)`
  grid-row: 1 / 1;
  grid-column: 1 / 1;
  transition: 0.5s spring;
`;
