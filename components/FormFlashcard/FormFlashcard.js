import styled, { keyframes, css } from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import FormInput from "./FormInput";
import { useState } from "react";
import { uid } from "uid";

export default function FormFlashcard({
  collections,
  headline,
  actionMode,
  changeActionMode,
  currentFlashcard,
  onSubmitFlashcard,
  isFormClosing,
  changeCollections,
}) {
  const [showNewCollectionFields, setShowNewCollectionFields] = useState(false);

  function handleCollectionChange(event) {
    if (event.target.value === "newCollection") {
      setShowNewCollectionFields(true);
    } else {
      setShowNewCollectionFields(false);
    }
  }

  function addNewCollection(formData) {
    const newCollectionName = formData.get("collectionName");
    const newCollectionColor = formData.get("collectionColor");
    const newCollection = {
      id: uid(),
      title: newCollectionName,
      color: newCollectionColor,
    };
    changeCollections(newCollection);
    return newCollection.id;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let newFlashcard;
    if (showNewCollectionFields) {
      const newId = addNewCollection(formData);
      newFlashcard = {
        collectionId: newId,
        question: formData.get("question"),
        answer: formData.get("answer"),
      };
    } else {
      newFlashcard = Object.fromEntries(formData);
    }

    onSubmitFlashcard(newFlashcard);
    setShowNewCollectionFields(false);
    event.target.reset();
  }

  /*
error in console
funktion oben verbessern (chat gpt fragen)
maxlength für alle eingaben in formular einfügen
nebenbei to-do's erledigen (zB useState zurücksetzen bei zurückgehen)
AC: The number of cards in a collection is displayed in the burger menu.
*/

  return (
    <StyledForm onSubmit={handleSubmit} $isFormClosing={isFormClosing}>
      <StyledFormHeadline>{headline}</StyledFormHeadline>
      <StyledLabel htmlFor="question">Question</StyledLabel>
      <FormInput
        name="question"
        actionMode={actionMode}
        currentFlashcard={currentFlashcard}
      />
      <StyledLabel htmlFor="answer">Answer</StyledLabel>
      <FormInput
        name="answer"
        actionMode={actionMode}
        currentFlashcard={currentFlashcard}
      />
      <StyledLabel htmlFor="collection">Collection</StyledLabel>
      <StyledSelect
        id="collection"
        name="collectionId"
        required
        defaultValue={
          actionMode === "edit" ? currentFlashcard.collectionId : ""
        }
        onChange={handleCollectionChange}
      >
        <option value="">--Please choose a collection:--</option>
        <option value="newCollection">+ Add New Collection</option>
        {collections.map((collection) => {
          return (
            <option key={collection.id} value={collection.id}>
              {collection.title}
            </option>
          );
        })}
      </StyledSelect>

      {showNewCollectionFields && (
        <NewCollectionWrapper>
          <CollectionNameWrapper>
            <StyledLabel htmlFor="collectionName">Collection Name</StyledLabel>
            <FormInput name="collectionName" />
          </CollectionNameWrapper>
          <CollectionColorWrapper>
            <StyledLabel htmlFor="collectionColor">Color</StyledLabel>
            <StyledColorInput
              type="color"
              id="collectionColor"
              name="collectionColor"
              required
            />
          </CollectionColorWrapper>
        </NewCollectionWrapper>
      )}

      <ButtonWrapper>
        <RegularButton type="submit" content="Submit" variant="submit" />
        {actionMode === "edit" && (
          <RegularButton
            type="button"
            content="Cancel"
            variant="confirm"
            onClick={() => changeActionMode("default")}
          />
        )}
      </ButtonWrapper>
    </StyledForm>
  );
}

const formAnimationIn = keyframes`
0% { top: -350px; }
100% { top: 100px; }
`;

const formAnimationOut = keyframes`
0% { top: 100px; }
100% { top: -350px; }
`;

const StyledForm = styled.form`
  animation: ${(props) =>
    props.$isFormClosing
      ? css`
          ${formAnimationOut} 0.5s ease-out;
        `
      : css`
          ${formAnimationIn} 0.5s ease-out;
        `};
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  top: 100px;
  width: 21rem;
  padding: 30px 10px 10px 10px;
  background-color: #fff;
  border: 1px solid #000;
  border-top: 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 0px 10px #000;
`;

const StyledFormHeadline = styled.h2`
  text-align: center;
`;

const StyledLabel = styled.label`
  display: block;
  padding: 10px 0 2px 0;
  font-size: 0.9rem;
`;

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  height: 1.5rem;
`;

const NewCollectionWrapper = styled.section`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const CollectionNameWrapper = styled.article`
  flex-grow: 3;
`;

const CollectionColorWrapper = styled.article`
  flex-grow: 1;
`;

const StyledColorInput = styled.input`
  height: 1.5rem;
  width: 100%;
`;
