import Collection from "@/components/Collection/Collection";
import styled from "styled-components";
import { StyledHeadlineWithPadding } from "@/styledComponents";

export default function CollectionList({
  modeSelection,
  collections,
  getCorrectFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  flashcardSelection,
  changeFlashcardSelection,
  handleDeleteCollection,
  getAllFlashcardsFromCollection,
}) {
  const capitalizedModeSelection =
    modeSelection.charAt(0).toUpperCase() + modeSelection.slice(1);

  return (
    <>
      <StyledHeadlineWithPadding>
        {capitalizedModeSelection} Mode
      </StyledHeadlineWithPadding>

      {collections.length > 0 && (
        <CollectionsWrapper>
          {collections.map((collection) => {
            return (
              <Collection
                key={collection._id}
                collection={collection}
                getCorrectFlashcardsFromCollection={
                  getCorrectFlashcardsFromCollection
                }
                getIncorrectFlashcardsFromCollection={
                  getIncorrectFlashcardsFromCollection
                }
                flashcardSelection={flashcardSelection}
                changeFlashcardSelection={changeFlashcardSelection}
                handleDeleteCollection={handleDeleteCollection}
                getAllFlashcardsFromCollection={getAllFlashcardsFromCollection}
                modeSelection={modeSelection}
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

const StyledMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 40px 20px;
`;
