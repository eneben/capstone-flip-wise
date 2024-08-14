import styled from "styled-components";
import { useState } from "react";

export default function Flashcard({ question, answer, collection }) {
  const [showAnswer, setShowAnswer] = useState(false);

  function handleShowAnswer() {
    setShowAnswer(!showAnswer);
  }

  return (
    <CardContainer onClick={handleShowAnswer}>
      <StyledFlashcard $showAnswer={showAnswer}>
        <CardFront>
          <CollectionTitle>{collection}</CollectionTitle>
          <Question>{question}</Question>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
          >
            <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
          </svg>
        </CardFront>
        <CardBack>
          <Answer>{answer}</Answer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
            transform="scale(-1 1)"
          >
            <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
          </svg>
        </CardBack>
      </StyledFlashcard>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  perspective: 1000px;
`;

const StyledFlashcard = styled.section`
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
  background-color: #f8f8f8;
  transform: rotateY(180deg);
`;

const CollectionTitle = styled.p`
  font-size: 0.8rem;
`;

const Question = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Answer = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;
