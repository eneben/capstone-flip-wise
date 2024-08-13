import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";

export default function FlashcardList({ headline, flashcards }) {
  return (
    <>
      <h1>{headline}</h1>
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
