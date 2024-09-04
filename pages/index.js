import Collection from "@/components/Collection/Collection";
import styled from "styled-components";

export default function HomePage({
  collections,
  actionMode,
  getCorrectFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
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

const StyledHeadline = styled.h1`
  text-align: center;
  padding: 35px 0 30px 0;
  font-size: 1.7rem;
`;
