import styled from "styled-components";
import { useState } from "react";

export default function Flashcard({ question, answer, collection }) {
  const [showAnswer, setShowAnswer] = useState(false);

  function handleShowAnswer() {
    setShowAnswer(!showAnswer);
  }

  return (
    <StyledFlashcard onClick={handleShowAnswer}>
      {!showAnswer && (
        <>
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
        </>
      )}
      {showAnswer && (
        <>
          <p>{answer}</p>
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
        </>
      )}
    </StyledFlashcard>
  );
}

const StyledFlashcard = styled.section`
  border: 1px solid #000;
  padding: 10px;
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
