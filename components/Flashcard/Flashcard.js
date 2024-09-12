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
  grid-template-rows: 54px 106px 54px;
  background-color: #fff;
`;

const CardBack = styled(CardFace)`
  display: grid;
  grid-template-columns: 54px 54px 24px 1fr 24px 54px 54px;
  grid-template-rows: 54px 106px 54px;
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
  border-bottom-right-radius: 10px;
`;

const Answer = styled.p`
  font: var(--question-answer);
  padding: 10px;
  grid-column: 1 / 8;
  grid-row: 2 / 3;
`;

const Question = styled.h3`
  font: var(--question-answer);
  padding: 10px;
  white-space: normal;
  grid-column: 1 / 8;
  grid-row: 2 / 3;
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
  grid-row: 3 / 4;
`;
