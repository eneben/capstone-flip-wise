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
  text-align: center;
  padding: 35px 0 30px 0;
  font-size: 1.7rem;
`;
