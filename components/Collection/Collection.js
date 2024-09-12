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
  );
}

const CollectionBox = styled(Link)`
  margin: 0 auto;
  width: 90vw;
  height: 218px;
  max-width: 500px;
  position: relative;
  border-radius: 10px;
  border: 2px solid ${({ $color }) => $color};
  display: grid;
  grid-template-columns: 54px 54px 24px 1fr 24px 54px 54px;
  grid-template-rows: 54px 106px 54px;
  background-color: #fff;
  text-decoration: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 2px solid ${({ $color }) => $color};
    z-index: -1;
  }

  &::after {
    top: 8px;
    right: 8px;
    border: none;
    background-color: var(--secondary-grey);
  }

  &::before {
    top: 15px;
    left: 8px;
    border: none;
    background-color: var(--secondary-mid-grey);
  }
`;

const CollectionName = styled.h3`
  font: var(--collection-name);
  color: #000;
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
