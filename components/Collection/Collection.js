import styled from "styled-components";
import CorrectCounter from "../CorrectCounter/CorrectCounter";
import Link from "next/link";
import RoundButton from "../Buttons/RoundButton";
import Delete from "@/public/icons/Delete.svg";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";

import { useState } from "react";

export default function Collection({
  collection,
  actionMode,
  getCorrectFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  flashcardSelection,
  changeFlashcardSelection,
  handleDeleteCollection,
}) {
  const [isDelete, setIsDelete] = useState(false);

  const { title: name, color, id } = collection;

  function toggleDeleteConfirmation(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDelete(!isDelete);
  }

  return (
    <CollectionBoxWrapper>
      <CollectionBoxShadow2 />
      <CollectionBoxShadow1 />
      {isDelete && (
        <CollectionBox $color={color} href={"/"}>
          <DeleteConfirmationDialog
            onDeleteCollection={handleDeleteCollection}
            toggleDeleteConfirmation={toggleDeleteConfirmation}
            id={id}
            variant="collection"
          />
        </CollectionBox>
      )}

      {!isDelete && (
        <CollectionBox $color={color} href={`/${id}`}>
          <RoundButton
            content={<Delete />}
            onClick={toggleDeleteConfirmation}
            type="button"
            variant="delete"
            actionMode={actionMode}
          />
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
      )}
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
  background-color: var(--secondary-light-grey);
`;

const CollectionBoxShadow2 = styled(CollectionBoxShadow)`
  top: 16px;
  left: -8px;
  background-color: var(--secondary-grey);
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
