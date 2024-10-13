import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import FormInput from "../FormFlashcard/FormInput";

export default function FormManual({
  collections,
  headline,
  actionMode,
  changeActionMode,
  currentFlashcard,
  onCollectionChange,
  showNewCollectionFields,
}) {
  return (
    <>
      <StyledFormWrapper>
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
          onChange={onCollectionChange}
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
              <StyledLabel htmlFor="collectionName">
                Collection Name
              </StyledLabel>
              <FormInput name="collectionName" maxlength="23" />
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
      </StyledFormWrapper>

      <ButtonWrapper>
        <RegularButton type="submit" variant="submit">
          Submit
        </RegularButton>
        {actionMode === "edit" && (
          <RegularButton
            type="button"
            variant="confirm"
            onClick={() => changeActionMode("default")}
          >
            Cancel
          </RegularButton>
        )}
      </ButtonWrapper>
    </>
  );
}

const StyledFormWrapper = styled.div`
  padding: 0 10px 0 10px;
`;

const StyledFormHeadline = styled.h2`
  font: var(--form-headline);
  text-align: center;
  padding-top: 20px;
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