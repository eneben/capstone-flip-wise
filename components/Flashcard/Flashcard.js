import styled from "styled-components";

export default function Flashcard({ question, answer, collection }) {
  return (
    <StyledFlashcard>
      <p>{collection}</p>
      <p>{question}</p>
      <p>{answer}</p>
    </StyledFlashcard>
  );
}

const StyledFlashcard = styled.section`
  border: 1px solid #000;
  padding: 10px;
`;
