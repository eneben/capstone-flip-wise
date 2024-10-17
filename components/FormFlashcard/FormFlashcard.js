import styled, { keyframes, css } from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import FormInput from "./FormInput";
import { useState } from "react";

export default function FormFlashcard({
  collections,
  headline,
  actionMode,
  currentFlashcard,
  onSubmitFlashcard,
  isFormClosing,
  onAddCollection,
  startClosingForm,
}) {
  const [showNewCollectionFields, setShowNewCollectionFields] = useState(false);

  function handleCollectionChange(event) {
    if (event.target.value === "newCollection") {
      setShowNewCollectionFields(true);
    } else {
      setShowNewCollectionFields(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target));
    const { collectionName, collectionColor, question, answer } = formData;
    let newFlashcard;

    if (showNewCollectionFields) {
      const newCollection = {
        title: collectionName,
        color: collectionColor,
      };
      const newCollectionId = await onAddCollection(newCollection);

      newFlashcard = {
        collectionId: newCollectionId,
        question,
        answer,
        level: 1,
        userId: null,
      };
    } else {
      newFlashcard = { ...formData, level: 1, userId: null };
    }

    onSubmitFlashcard(newFlashcard);
    setShowNewCollectionFields(false);
    event.target.reset();
    startClosingForm();
  }

  return (
    <StyledForm onSubmit={handleSubmit} $isFormClosing={isFormClosing}>
      <StyledFormHeadline>{headline}</StyledFormHeadline>
      <StyledLabel htmlFor="question">Question</StyledLabel>
      <FormInput
        name="question"
        actionMode={actionMode}
        currentFlashcard={currentFlashcard}
        maxLength="100"
      />
      <StyledLabel htmlFor="answer">Answer</StyledLabel>
      <FormInput
        name="answer"
        actionMode={actionMode}
        currentFlashcard={currentFlashcard}
        maxLength="70"
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
            <option key={collection._id} value={collection._id}>
              {collection.title}
            </option>
          );
        })}
      </StyledSelect>

      {showNewCollectionFields && (
        <NewCollectionWrapper>
          <CollectionNameWrapper>
            <StyledLabel htmlFor="collectionName">Collection Name</StyledLabel>
            <FormInput name="collectionName" maxLength="23" />
          </CollectionNameWrapper>
          <CollectionColorWrapper>
            <StyledLabel htmlFor="collectionColor">Color</StyledLabel>
            <StyledColorInput
              type="color"
              id="collectionColor"
              name="collectionColor"
              defaultValue="#000000"
              required
            />
          </CollectionColorWrapper>
        </NewCollectionWrapper>
      )}

      <ButtonWrapper>
        <RegularButton type="submit" variant="submit">
          Submit
        </RegularButton>
        {actionMode === "edit" && (
          <RegularButton
            type="button"
            variant="confirm"
            onClick={() => startClosingForm()}
          >
            Cancel
          </RegularButton>
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
  border-top: 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 0px 10px #000;
`;

const StyledFormHeadline = styled.h2`
  font: var(--form-headline);
  text-align: center;
`;

const StyledLabel = styled.label`
  display: block;
  padding: 10px 0 2px 0;
  font: var(--form-label);
`;

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  font: var(--form-input);
  height: 1.7rem;
  border: 1px solid var(--primary-neutral);
  border-radius: 2px;
  &:focus {
    outline: 1px solid var(--primary-neutral);
  }
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
