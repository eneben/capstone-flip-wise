import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";

export default function FlashcardList({ headline, flashcards }) {
  return (
    <>
      <StyledHeadline>{headline}</StyledHeadline>
      <FlashcardListWrapper>
        {flashcards.map((flashcard) => {
          return (
            <Flashcard
              key={flashcard.id}
              question={flashcard.question}
              answer={flashcard.answer}
              collection={flashcard.collectionTitle}
            />
          );
        })}
      </FlashcardListWrapper>
    </>
  );
}

const FlashcardListWrapper = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  list-style: none;
`;

const StyledHeadline = styled.h1`
  text-align: center;
  padding: 15px 0;
  font-size: 1.7rem;
`;
