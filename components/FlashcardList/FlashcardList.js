import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";

export default function FlashcardList({
  headline,
  subheading,
  flashcards,
  handleToggleCorrect,
  handleDelete,
  changeCurrentFlashcard,
  changeActionMode,
  collectionColor,
}) {
  return (
    <>
      <StyledHeadline>{headline}</StyledHeadline>
      <StyledSubheading>{subheading}</StyledSubheading>
      <FlashcardListWrapper>
        {flashcards.map((flashcard) => {
          return (
            <Flashcard
              collectionColor={collectionColor}
              handleDelete={handleDelete}
              key={flashcard.id}
              flashcard={flashcard}
              onToggleCorrect={handleToggleCorrect}
              changeCurrentFlashcard={changeCurrentFlashcard}
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

const StyledHeadline = styled.h2`
  text-align: center;
  padding-top: 35px;
  font-size: 1.7rem;
`;

const StyledSubheading = styled.h3`
  text-align: center;
  font-size: 1.2rem;
  padding: 5px 0 30px 0;
`;
