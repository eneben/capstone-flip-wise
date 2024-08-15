import styled from "styled-components";
import { useState } from "react";

export default function Flashcard({ flashcard, onIsCorrect }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { question, answer, collectionTitle: collection, id } = flashcard;

  function handleShowAnswer() {
    setShowAnswer(!showAnswer);
  }

  function handleToggleIsCorrect() {
    setIsCorrect(!isCorrect);
    onIsCorrect(id);
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
              onClick={handleToggleIsCorrect}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </StyledButton>
          )}
          <StyledArrow
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
          >
            <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
          </StyledArrow>
        </CardFront>
        <CardBack>
          <Answer>{answer}</Answer>

          <StyledButton $isCorrect={isCorrect} onClick={handleToggleIsCorrect}>
            {isCorrect ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            )}
          </StyledButton>

          <StyledArrow
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
            transform="scale(-1 1)"
          >
            <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
          </StyledArrow>
        </CardBack>
      </StyledFlashcard>
    </CardContainer>
  );
}

const CardContainer = styled.li`
  perspective: 1000px;
`;

const StyledFlashcard = styled.article`
  width: 19rem;
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

const StyledArrow = styled.svg`
  position: absolute;
  right: 10px;
  bottom: 15px;
`;
