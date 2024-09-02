import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";
import Link from "next/link";

export default function FlashcardList({
  headline,
  subheading,
  flashcards,
  handleToggleCorrect,
  handleDelete,
  changeCurrentFlashcard,
  actionMode,
  changeActionMode,
  collectionColor,
}) {
  return (
    <>
      <StyledLink href="/" onClick={() => changeActionMode("default")}>
        Back to collections list
      </StyledLink>

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
  padding-top: 10px;
  font-size: 1.7rem;
`;

const StyledSubheading = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  padding: 5px 0 30px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 6px;
  background-color: #eee;
  display: block;
  margin: 10px;
  width: fit-content;
`;
