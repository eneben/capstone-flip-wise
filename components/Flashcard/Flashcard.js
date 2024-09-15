import styled from "styled-components";
import { useState } from "react";
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
  handleDelete,
  changeCurrentFlashcard,
  changeActionMode,
  collectionColor,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const {
    question,
    answer,
    collectionTitle: collection,
    id,
    isCorrect,
  } = flashcard;

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const contrastOptions = {
    color: collectionColor,
    threshold: 0.5,
    highColor: "#000",
    lowColor: "#fff",
  };

  const titleColor = findContrastColor(contrastOptions);

  return (
    <CardContainer onClick={handleShowAnswer}>
      <StyledFlashcard $showAnswer={showAnswer}>
        {isDelete && (
          <>
            <CardFront $collectionColor={collectionColor}>
              <StyledDeleteConfirmationDialogContainer>
                <DeleteConfirmationDialog
                  onDelete={handleDelete}
                  toggleDeleteConfirmation={toggleDeleteConfirmation}
                  flashcardId={id}
                />
              </StyledDeleteConfirmationDialogContainer>
            </CardFront>
            <CardBack $collectionColor={collectionColor}>
              <StyledDeleteConfirmationDialogContainer>
                <DeleteConfirmationDialog
                  onDelete={handleDelete}
                  toggleDeleteConfirmation={toggleDeleteConfirmation}
                  flashcardId={id}
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
              {/* {isCorrect && (
                <StyledMarkAsButtonContainer>
                  <RoundButton
                    content={<MarkAsIncorrect />}
                    onClick={() => onToggleCorrect(id)}
                    type="button"
                    variant="markAsIncorrect"
                  />
                </StyledMarkAsButtonContainer>
              )} */}

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
  transition: transform 0.6s;
  transform: ${({ $showAnswer }) =>
    $showAnswer ? "rotateY(180deg)" : "rotateY(0deg)"};
  cursor: pointer;

  @media (min-width: 768px) {
    width: 60vw;
    min-height: 300px;
    height: 40vh;
    transition: transform 0.8s;
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  border: var(--border-thickness) solid
    ${({ $collectionColor }) => $collectionColor};
`;

const CardFront = styled(CardFace)`
  display: grid;
  grid-template-columns: var(--grid-columns-card-and-title);
  grid-template-rows: var(--grid-rows-card-and-title);
  background-color: #fff;

  @media (min-width: 768px) {
    grid-template-rows: 54px 1fr 54px;
  }
`;

const CardBack = styled(CardFace)`
  display: grid;
  grid-template-columns: var(--grid-columns-card-and-title);
  grid-template-rows: var(--grid-rows-card-and-title);
  background-color: var(--secondary-light-grey);
  transform: rotateY(180deg);

  @media (min-width: 768px) {
    grid-template-rows: 54px 1fr 54px;
  }
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
`;

const Question = styled.h3`
  font: var(--question-answer);
  padding: 10px;
  white-space: normal;
  grid-column: 1 / 8;
  grid-row: 2 / 3;
  align-self: center;
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
    padding: 40px;
    grid-column: 1 / 8;
    grid-row: 2 / 3;
  }
`;
