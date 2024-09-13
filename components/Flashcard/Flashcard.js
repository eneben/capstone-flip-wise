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
              <DeleteConfirmationDialog
                onDelete={handleDelete}
                toggleDeleteConfirmation={toggleDeleteConfirmation}
                flashcardId={id}
              />
            </CardFront>
            <CardBack $collectionColor={collectionColor}>
              <DeleteConfirmationDialog
                onDelete={handleDelete}
                toggleDeleteConfirmation={toggleDeleteConfirmation}
                flashcardId={id}
              />
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
                  content={
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="currentColor"
                        d="M15.419 3.67708C16.3218 2.77431 17.7855 2.77431 18.6883 3.67708L20.3229 5.31171C21.2257 6.21449 21.2257 7.67818 20.3229 8.58096L18.8736 10.0303C18.7598 9.97394 18.6401 9.91302 18.516 9.84767C17.6806 9.40786 16.6892 8.79057 15.9493 8.05069C15.2095 7.31082 14.5922 6.31945 14.1524 5.48403C14.087 5.35989 14.0261 5.24018 13.9697 5.12639L15.419 3.67708ZM14.8887 9.11135C15.7642 9.98687 16.8777 10.6759 17.7595 11.1444L12.06 16.8438C11.7064 17.1975 11.2475 17.4269 10.7523 17.4977L7.31963 17.9881C6.5568 18.097 5.90295 17.4432 6.01193 16.6804L6.50231 13.2477C6.57305 12.7525 6.80248 12.2936 7.15616 11.94L12.8556 6.24053C13.3241 7.12234 14.0131 8.23582 14.8887 9.11135ZM11.5 19.5C11.0858 19.5 10.75 19.8358 10.75 20.25C10.75 20.6642 11.0858 21 11.5 21H20.25C20.6642 21 21 20.6642 21 20.25C21 19.8358 20.6642 19.5 20.25 19.5H11.5Z"
                      />
                    </svg>
                  }
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
                <StyledMarkAsButtonContainer>
                  <RoundButton
                    content={<MarkAsIncorrect />}
                    onClick={() => onToggleCorrect(id)}
                    type="button"
                    variant="markAsIncorrect"
                  />
                </StyledMarkAsButtonContainer>
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
  height: 218px;
  max-width: 500px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ $showAnswer }) =>
    $showAnswer ? "rotateY(180deg)" : "rotateY(0deg)"};
  cursor: pointer;
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
  grid-template-columns: 54px 54px 24px 1fr 24px 54px 54px;
  grid-template-rows: var(--grid-rows-card-and-title);
  background-color: #fff;
`;

const CardBack = styled(CardFace)`
  display: grid;
  grid-template-columns: 54px 54px 24px 1fr 24px 54px 54px;
  grid-template-rows: var(--grid-rows-card-and-title);
  background-color: var(--secondary-grey);
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
  grid-row: 2 / 4;
  align-self: center;
`;

const Question = styled.h3`
  font: var(--question-answer);
  padding: 10px;
  white-space: normal;
  grid-column: 1 / 8;
  grid-row: 2 / 4;
  align-self: center;
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
  grid-column: 1 / 2;
  grid-row: 4 / 5;
`;
