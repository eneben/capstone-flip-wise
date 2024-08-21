import styled from "styled-components";
import { useState } from "react";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import Delete from "@/public/icons/Delete.svg";
import Arrow from "@/public/icons/Arrow.svg";
import { RoundButton, RegularButton } from "../Button/Button";

export default function Flashcard({ flashcard, onIsCorrect, onDelete }) {
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

  return (
    <CardContainer onClick={handleShowAnswer}>
      <StyledFlashcard $showAnswer={showAnswer}>
        {isDelete && (
          <>
            <p>Do you want to delete this flashcard?</p>
            <RegularButton
              content="Yes"
              onClick={onDelete(id)}
              type="button"
              variant="confirm"
            />
            <RegularButton
              content="No"
              onClick={toggleDeleteConfirmation}
              type="button"
              variant="warning"
            />
          </>
        )}

        {!isDelete && (
          <>
            <CardFront>
              <CollectionTitle>{collection}</CollectionTitle>

              <RoundButton
                content={<Delete />}
                onClick={toggleDeleteConfirmation}
                type="button"
                variant="delete"
              />
              <Question>{question}</Question>
              {isCorrect && (
                <RoundButton
                  content={<MarkAsIncorrect />}
                  onClick={() => onIsCorrect(id)}
                  type="button"
                  variant="markAsIncorrect"
                />
              )}
              <StyledArrow />
            </CardFront>
            <CardBack>
              <Answer>{answer}</Answer>

              <RoundButton
                content={isCorrect ? <MarkAsIncorrect /> : <MarkAsCorrect />}
                onClick={() => onIsCorrect(id)}
                type="button"
                variant={isCorrect ? "markAsIncorrect" : "markAsCorrect"}
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
  border: 1px solid #000;
  padding: 10px;
  border-radius: 10px;
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

const Question = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  padding-top: 37.2px;
`;

const StyledArrow = styled(Arrow)`
  position: absolute;
  right: 10px;
  bottom: 15px;
`;
