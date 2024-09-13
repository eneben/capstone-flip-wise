import styled from "styled-components";
import CorrectCounter from "../CorrectCounter/CorrectCounter";
import Link from "next/link";

export default function Collection({
  collection,
  actionMode,
  getCorrectFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  flashcardSelection,
  changeFlashcardSelection,
}) {
  const { title: name, color, id } = collection;
  return (
    <CollectionBoxWrapper>
      <CollectionBoxShadow2 />
      <CollectionBoxShadow1 />
      <CollectionBox
        $color={color}
        href={`/${id}`}
        onClick={() => changeFlashcardSelection("all")}
      >
        <CollectionName>{name}</CollectionName>
        <IconIncorrectWrapper>
          <CorrectCounter
            getIncorrectFlashcardsFromCollection={
              getIncorrectFlashcardsFromCollection
            }
            getCorrectFlashcardsFromCollection={
              getCorrectFlashcardsFromCollection
            }
            id={id}
            variant="incorrect"
            collectionTitle={true}
            actionMode={actionMode}
            flashcardSelection={flashcardSelection}
            changeFlashcardSelection={changeFlashcardSelection}
          />
        </IconIncorrectWrapper>
        <IconCorrectWrapper>
          <CorrectCounter
            getCorrectFlashcardsFromCollection={
              getCorrectFlashcardsFromCollection
            }
            getIncorrectFlashcardsFromCollection={
              getIncorrectFlashcardsFromCollection
            }
            id={id}
            variant="correct"
            collectionTitle={true}
            actionMode={actionMode}
            flashcardSelection={flashcardSelection}
            changeFlashcardSelection={changeFlashcardSelection}
          />
        </IconCorrectWrapper>
      </CollectionBox>
    </CollectionBoxWrapper>
  );
}

const CollectionBoxWrapper = styled.div`
  margin: 0 auto;
  width: 90vw;
  height: 218px;
  max-width: 500px;
  position: relative;
`;

const CollectionBoxShadow = styled.div`
  margin: 0 auto;
  width: 90vw;
  height: 218px;
  max-width: 500px;
  position: absolute;
  border-radius: 10px;
`;

const CollectionBoxShadow1 = styled(CollectionBoxShadow)`
  top: 8px;
  left: 8px;
  background-color: var(--secondary-grey);
`;

const CollectionBoxShadow2 = styled(CollectionBoxShadow)`
  top: 16px;
  left: -8px;
  background-color: var(--secondary-mid-grey);
`;

const CollectionBox = styled(Link)`
  margin: 0 auto;
  width: 90vw;
  height: 218px;
  max-width: 500px;
  position: relative;
  border-radius: 10px;
  border: 2px solid ${({ $color }) => $color};
  display: grid;
  grid-template-columns: var(--grid-columns-card-and-title);
  grid-template-rows: var(--grid-rows-card-and-title);
  background-color: #fff;
  text-decoration: none;
  color: #000;
`;

const CollectionName = styled.h3`
  font: var(--collection-name);
  text-align: center;
  align-self: center;
  grid-column: 1 / 8;
  grid-row: 2 / 3;
`;

const IconWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const IconIncorrectWrapper = styled(IconWrapper)`
  grid-column: 1 / 3;
  grid-row: 3 / 4;
`;

const IconCorrectWrapper = styled(IconWrapper)`
  grid-column: 6 / 8;
  grid-row: 3 / 4;
`;
