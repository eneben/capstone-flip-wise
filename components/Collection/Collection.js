import styled from "styled-components";
import CorrectCounter from "../CorrectCounter/CorrectCounter";
import Link from "next/link";
import RoundButton from "../Buttons/RoundButton";
import Delete from "@/public/icons/Delete.svg";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import LevelBar from "../LevelBar/LevelBar";
import { useState } from "react";

export default function Collection({
  collection,
  getCorrectFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  getAllFlashcardsFromCollection,
  flashcardSelection,
  changeFlashcardSelection,
  handleDeleteCollection,
  modeSelection,
}) {
  const [isDelete, setIsDelete] = useState(false);

  const { title: name, color, id } = collection;

  function toggleDeleteConfirmation(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDelete(!isDelete);
  }

  const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);

  function getAverageOfLevels() {
    if (allFlashcardsFromCollection.length === 0) return 1;

    const sumOfLevels = allFlashcardsFromCollection.reduce(
      (accumulator, flashcard) => accumulator + flashcard.level,
      0
    );
    const average = sumOfLevels / allFlashcardsFromCollection.length;
    return average;
  }

  return (
    <CollectionBoxWrapper>
      <CollectionBoxShadow2 />
      <CollectionBoxShadow1 />
      {isDelete && (
        <CollectionBox $color={color} href={`/${modeSelection}`}>
          <StyledDeleteConfirmationDialogContainer>
            <DeleteConfirmationDialog
              onDeleteCollection={handleDeleteCollection}
              toggleDeleteConfirmation={toggleDeleteConfirmation}
              id={id}
              variant="collection"
            />
          </StyledDeleteConfirmationDialogContainer>
        </CollectionBox>
      )}

      {!isDelete && (
        <CollectionBox $color={color} href={`/${modeSelection}/${id}`}>
          <StyledDeleteButtonContainer>
            <RoundButton
              onClick={toggleDeleteConfirmation}
              type="button"
              variant="delete"
            >
              <Delete />
            </RoundButton>
          </StyledDeleteButtonContainer>
          <CollectionName>{name}</CollectionName>

          {modeSelection === "learning" && (
            <>
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
                  flashcardSelection={flashcardSelection}
                  changeFlashcardSelection={changeFlashcardSelection}
                />
              </IconCorrectWrapper>
            </>
          )}

          {modeSelection === "training" && (
            <LevelBarWrapper>
              <LevelBar average={getAverageOfLevels()} />
            </LevelBarWrapper>
          )}
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

  @media (min-width: 768px) {
    min-height: 300px;
    max-height: 400px;
  }
`;

const CollectionBoxShadow = styled.div`
  margin: 0 auto;
  width: 90vw;
  height: 218px;
  max-width: 500px;
  position: absolute;
  border-radius: 10px;

  @media (min-width: 768px) {
    min-height: 300px;
    max-height: 400px;
  }
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

  @media (min-width: 768px) {
    min-height: 300px;
    max-height: 400px;
  }
`;

const CollectionName = styled.h3`
  font: var(--collection-name);
  text-align: center;
  align-self: center;
  grid-column: 1 / 8;
  grid-row: 2 / 3;
`;

const IconWrapper = styled.div`
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

const LevelBarWrapper = styled.div`
  padding-top: 20px;
  grid-column: 1 / 8;
  grid-row: 3 / 4;
`;

const RoundButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDeleteButtonContainer = styled(RoundButtonContainer)`
  grid-column: 7 / 8;
  grid-row: 1 / 2;
`;

const StyledDeleteConfirmationDialogContainer = styled.div`
  grid-column: 1 / 8;
  grid-row: 2 / 4;

  @media (min-width: 768px) {
    padding-top: 40px;
  }
`;
