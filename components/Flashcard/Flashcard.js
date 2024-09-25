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
  handleFirstClick,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // icon bubble animation
  // const [isAnimating, setIsAnimating] = useState(false);
  // const [swipeDirection, setSwipeDirection] = useState(null);

  const {
    question,
    answer,
    collectionTitle: collection,
    id,
    isCorrect,
    level,
  } = flashcard;

  const motionValue = useMotionValue(0);
  const rotateValue = useTransform(motionValue, [-300, 300], [-100, 100]);
  const opacityValue = useTransform(
    motionValue,
    [-150, -75, 0, 75, 150],
    [0, 0, 1, 0, 0]
  );

  function resetState() {
    setShowAnswer(false);
    setIsDelete(false);
    setIsVisible(true);
  }

  function handleDragEnd() {
    if (!showAnswer) return;
    const x = motionValue.get();

    if (x > 30) {
      onIncreaseFlashcardLevel(id);
      resetState();
      // setSwipeDirection("right");
      // handleAnimationIcon();
    } else if (x < -30) {
      onDecreaseFlashcardLevel(id);
      resetState();
      // setSwipeDirection("left");
      // handleAnimationIcon();
    }
  }

  // icon bubble function:

  // function handleAnimationIcon() {
  //   setIsAnimating(true);
  // }
  // useEffect(() => {
  //   let timer;
  //   if (isAnimating) {
  //     timer = setTimeout(() => {
  //       setIsAnimating(false);
  //       setSwipeDirection(null);
  //     }, 4000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [isAnimating]);

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
  }

  function handleMarkAsCorrect(id) {
    handleFirstClick();
    onIncreaseFlashcardLevel(id);
  }

  function handleMarkAsInCorrect(id) {
    handleFirstClick();
    onDecreaseFlashcardLevel(id);
  }

  const contrastOptions = {
    color: collectionColor,
    threshold: 0.5,
    highColor: "#000",
    lowColor: "#fff",
  };

  const titleColor = findContrastColor(contrastOptions);

  // icon bubble styling:

  // const SwipeIcon = ({ direction }) => (
  //   <motion.div
  //     initial={{ opacity: 0, scale: 0.5 }}
  //     animate={{
  //       scale: [1, 2, 1.5],
  //       opacity: [0.5, 1, 0.5, 0],
  //     }}
  //     transition={{ duration: 1 }}
  //     style={{
  //       position: "absolute",
  //       top: "5%",
  //       left: direction === "left" ? "5%" : "auto",
  //       right: direction === "right" ? "5%" : "auto",
  //       transform: "translateY(-50%)",
  //       backgroundColor:
  //         direction === "left" ? "var(--primary-red)" : "var(--primary-green)",
  //       borderRadius: "50%",
  //       width: "30px",
  //       height: "30px",
  //       color: "#fff",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  //       zIndex: 1000,
  //     }}
  //   >
  //     {direction === "left" ? (
  //       <MarkAsIncorrect style={{ color: "white" }} />
  //     ) : (
  //       <MarkAsCorrect style={{ color: "white" }} />
  //     )}
  //   </motion.div>
  // );

  return (
    <>
      {isVisible && modeSelection === "training" ? (
        <motion.div
          drag={showAnswer ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: motionValue, rotate: rotateValue, opacity: opacityValue }}
          onDragEnd={handleDragEnd}
          transition={{ type: "spring", duration: 0.5 }}
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
                      >
                        <Edit />
                      </RoundButton>
                    </StyledEditButtonContainer>
                    <StyledDeleteButtonContainer>
                      <RoundButton
                        onClick={toggleDeleteConfirmation}
                        type="button"
                        variant="delete"
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
                      >
                        <Delete />
                      </RoundButton>
                    </StyledDeleteButtonContainer>
                    <Answer>{answer}</Answer>

                    {modeSelection === "learning" && (
                      <StyledMarkAsButtonContainer>
                        <RoundButton
                          onClick={() => onToggleCorrect(id)}
                          type="button"
                          variant={
                            isCorrect ? "markAsIncorrect" : "markAsCorrect"
                          }
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
          {/* {isAnimating && (
            <>
              {swipeDirection === "right" && <SwipeIcon direction="right" />}
              {swipeDirection === "left" && <SwipeIcon direction="left" />}
            </>
          )} */}
        </motion.div>
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
                    >
                      <Edit />
                    </RoundButton>
                  </StyledEditButtonContainer>
                  <StyledDeleteButtonContainer>
                    <RoundButton
                      onClick={toggleDeleteConfirmation}
                      type="button"
                      variant="delete"
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
                    >
                      <Delete />
                    </RoundButton>
                  </StyledDeleteButtonContainer>
                  <Answer>{answer}</Answer>

                  {modeSelection === "learning" && (
                    <StyledMarkAsButtonContainer>
                      <RoundButton
                        onClick={() => onToggleCorrect(id)}
                        type="button"
                        variant={
                          isCorrect ? "markAsIncorrect" : "markAsCorrect"
                        }
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
  height: auto;
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
