import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";

export default function FlashcardList({
  headline,
  subheading,
  flashcards,
  handleToggleCorrect,
  handleDeleteFlashcard,
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
              handleDeleteFlashcard={handleDeleteFlashcard}
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
  font: var(--main-headline);
  text-align: center;
  padding-top: 35px;
`;

const StyledSubheading = styled.h3`
  font: var(--sub-headline);
  text-align: center;
  padding: 5px 0 30px 0;
`;
