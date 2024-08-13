import styled from "styled-components";

export default function Flashcard({ question, answer, collection }) {
  return (
    <StyledFlashcard>
      <CollectionTitle>{collection}</CollectionTitle>
      <Question>{question}</Question>
      <p>{answer}</p>
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
