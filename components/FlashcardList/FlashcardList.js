import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";

export default function FlashcardList({
  headline,
  flashcards,
  handleIsCorrect,
}) {
  return (
    <>
      <StyledHeadline>{headline}</StyledHeadline>
      <FlashcardListWrapper>
        {flashcards.map((flashcard) => {
          return (
            <Flashcard
              key={flashcard.id}
              flashcard={flashcard}
              onIsCorrect={handleIsCorrect}
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
  padding: 30px 0 15px 0;
  font-size: 1.7rem;
`;
