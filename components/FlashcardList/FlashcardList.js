import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";

export default function FlashcardList({
  headline,
  flashcards,
  handleToggleCorrect,
  handleDelete,
  setCurrentFlashcard,
  actionMode,
  changeActionMode,
}) {
  return (
    <>
      <StyledHeadline>{headline}</StyledHeadline>
      <FlashcardListWrapper>
        {flashcards.map((flashcard) => {
          return (
            <Flashcard
              handleDelete={handleDelete}
              key={flashcard.id}
              flashcard={flashcard}
              onToggleCorrect={handleToggleCorrect}
              setCurrentFlashcard={setCurrentFlashcard}
              actionMode={actionMode}
              changeActionMode={changeActionMode}
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
