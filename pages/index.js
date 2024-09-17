import Collection from "@/components/Collection/Collection";
import styled from "styled-components";

export default function HomePage({
  collections,
  actionMode,
  getCorrectFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  flashcardSelection,
  changeFlashcardSelection,
  handleDeleteCollection,
}) {
  return (
    <>
      <StyledHeadline>My flashcard collections</StyledHeadline>

      {collections.length > 0 && (
        <CollectionsWrapper>
          {collections.map((collection) => {
            return (
              <Collection
                key={collection.id}
                collection={collection}
                actionMode={actionMode}
                getCorrectFlashcardsFromCollection={
                  getCorrectFlashcardsFromCollection
                }
                getIncorrectFlashcardsFromCollection={
                  getIncorrectFlashcardsFromCollection
                }
                flashcardSelection={flashcardSelection}
                changeFlashcardSelection={changeFlashcardSelection}
                handleDeleteCollection={handleDeleteCollection}
              />
            );
          })}
        </CollectionsWrapper>
      )}

      {collections.length === 0 && (
        <StyledMessage>
          All collections and the flashcards they contained have been deleted.
          Add new flashcards to create new collections.
        </StyledMessage>
      )}
    </>
  );
}

const CollectionsWrapper = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  list-style: none;
`;

const StyledHeadline = styled.h2`
  font: var(--main-headline);
  text-align: center;
  padding: 35px 0 30px 0;
`;

const StyledMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 40px 20px;
`;
