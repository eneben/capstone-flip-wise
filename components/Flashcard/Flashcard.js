import styled from "styled-components";
import { useState } from "react";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import Delete from "@/public/icons/Delete.svg";
import Arrow from "@/public/icons/Arrow.svg";
import Edit from "@/public/icons/Edit.svg";
import RoundButton from "../Buttons/RoundButton";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";

export default function Flashcard({
  flashcard,
  onToggleCorrect,
  handleDelete,
  changeCurrentFlashcard,
  actionMode,
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
    if (!isDelete && actionMode === "default") setShowAnswer(!showAnswer);
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
              <CollectionTitle>{collection}</CollectionTitle>
              <RoundButton
                content={<Edit />}
                onClick={setEditWithoutFlip}
                type="button"
                variant="edit"
                disabled={actionMode !== "default"}
                actionMode={actionMode}
              />
              <RoundButton
                content={<Delete />}
                onClick={toggleDeleteConfirmation}
                type="button"
                variant="delete"
                disabled={actionMode !== "default"}
                actionMode={actionMode}
              />
              <Question>{question}</Question>
              {isCorrect && (
                <RoundButton
                  content={<MarkAsIncorrect />}
                  onClick={() => onToggleCorrect(id)}
                  type="button"
                  variant="markAsIncorrect"
                  disabled={actionMode !== "default"}
                  actionMode={actionMode}
                />
              )}
              <StyledArrow />
            </CardFront>
            <CardBack $collectionColor={collectionColor}>
              <RoundButton
                content={<Delete />}
                onClick={toggleDeleteConfirmation}
                type="button"
                variant="delete"
                disabled={actionMode !== "default"}
                actionMode={actionMode}
              />
              <Answer>{answer}</Answer>

              <RoundButton
                content={isCorrect ? <MarkAsIncorrect /> : <MarkAsCorrect />}
                onClick={() => onToggleCorrect(id)}
                type="button"
                variant={isCorrect ? "markAsIncorrect" : "markAsCorrect"}
                disabled={actionMode !== "default"}
                actionMode={actionMode}
              />
              <StyledArrow transform="scale(-1 1)" />
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
  width: 20rem;
  height: 13rem;
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
  padding: 10px;
  border-radius: 10px;
  border: 2px solid ${({ $collectionColor }) => $collectionColor || "#000"};
`;

const CardFront = styled(CardFace)`
  background-color: #fff;
`;

const CardBack = styled(CardFace)`
  background-color: #e6e6e6;
  transform: rotateY(180deg);
`;

const CollectionTitle = styled.p`
  font-size: 0.8rem;
`;

const Answer = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  padding-top: 50px;
`;

const Question = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  padding-top: 37.2px;
`;

const StyledArrow = styled(Arrow)`
  position: absolute;
  right: 10px;
  bottom: 15px;
`;
