import styled from "styled-components";
import CorrectCounter from "../CorrectCounter/CorrectCounter";
import Link from "next/link";
import RoundButton from "../Buttons/RoundButton";
import Delete from "@/public/icons/Delete.svg";

import { useState } from "react";

export default function Collection({
  collection,
  actionMode,
  getCorrectFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  flashcardSelection,
  changeFlashcardSelection,
}) {
  const [isDelete, setIsDelete] = useState(false);

  const { title: name, color, id } = collection;

  function toggleDeleteConfirmation(event) {
    event.stopPropagation();
    setIsDelete(!isDelete);
  }

  return (
    <CollectionBox $color={color} href={`/${id}`}>
      {isDelete && <></>}

      {!isDelete && (
        <>
          <RoundButton
            content={<Delete />}
            onClick={toggleDeleteConfirmation}
            type="button"
            variant="delete"
            actionMode={actionMode}
          />
          <CollectionName>{name}</CollectionName>
          <IconWrapper>
            <CorrectCounter
              getIncorrectFlashcardsFromCollection={
                getIncorrectFlashcardsFromCollection
              }
              getCorrectFlashcardsFromCollection={
                getCorrectFlashcardsFromCollection
              }
              id={id}
              variant="incorrect"
              actionMode={actionMode}
              flashcardSelection={flashcardSelection}
              changeFlashcardSelection={changeFlashcardSelection}
            />
            <CorrectCounter
              getCorrectFlashcardsFromCollection={
                getCorrectFlashcardsFromCollection
              }
              getIncorrectFlashcardsFromCollection={
                getIncorrectFlashcardsFromCollection
              }
              id={id}
              variant="correct"
              actionMode={actionMode}
              flashcardSelection={flashcardSelection}
              changeFlashcardSelection={changeFlashcardSelection}
            />
          </IconWrapper>
        </>
      )}
    </CollectionBox>
  );
}

const CollectionBox = styled(Link)`
  margin: 0 auto;
  width: 20rem;
  height: 13rem;
  position: relative;
  border-radius: 10px;
  border: 2px solid ${({ $color }) => $color};
  padding: 10px;
  background-color: #fff;
  text-decoration: none;
  color: #000;

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
    top: 10px;
    right: 10px;
    background-color: #ddd;
  }

  &::before {
    top: 19px;
    left: 10px;
    background-color: #bbb;
  }
`;

const CollectionName = styled.h3`
  font-size: 1.5rem;
  padding-top: 50px;
  text-align: center;
`;

const IconWrapper = styled.section`
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  gap: 140px;
  bottom: 15px;
  left: 0;
  right: 0;
`;
