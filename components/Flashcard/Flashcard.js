import styled from "styled-components";
import { useState } from "react";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import Arrow from "@/public/icons/Arrow.svg";

export default function Flashcard({ flashcard, onIsCorrect }) {
  const [showAnswer, setShowAnswer] = useState(false);

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

  return (
    <CardContainer onClick={handleShowAnswer}>
      <StyledFlashcard $showAnswer={showAnswer}>
        <CardFront>
          <CollectionTitle>{collection}</CollectionTitle>
          <Question>{question}</Question>
          {isCorrect && (
            <StyledButton
              $isCorrect={isCorrect}
              onClick={() => onIsCorrect(id)}
            >
              <MarkAsIncorrect />
            </StyledButton>
          )}
          <StyledArrow />
        </CardFront>
        <CardBack>
          <Answer>{answer}</Answer>
          <StyledButton $isCorrect={isCorrect} onClick={() => onIsCorrect(id)}>
            {isCorrect ? <MarkAsIncorrect /> : <MarkAsCorrect />}
          </StyledButton>
          <StyledArrow transform="scale(-1 1)" />
        </CardBack>
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

const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  left: 10px;
  background-color: ${({ $isCorrect }) => ($isCorrect ? "#edafb8" : "#b0c4b1")};
`;

const StyledArrow = styled(Arrow)`
  position: absolute;
  right: 10px;
  bottom: 15px;
`;
