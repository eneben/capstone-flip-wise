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

const FlashcardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledHeadline = styled.h2`
  text-align: center;
`;
