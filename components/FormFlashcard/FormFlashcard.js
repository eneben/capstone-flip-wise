import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";

export default function FormFlashcard({
  collections,
  headline,
  actionMode,
  changeActionMode,
  currentFlashcard,
  onSubmitFlashcard,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newFlashcard = Object.fromEntries(formData);
    onSubmitFlashcard(newFlashcard);
    event.target.reset();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormHeadline>{headline}</StyledFormHeadline>
      <StyledLabel htmlFor="question">Question</StyledLabel>
      <StyledInput
        id="question"
        name="question"
        type="text"
        required
        defaultValue={actionMode === "edit" ? currentFlashcard.question : ""}
      />
      <StyledLabel htmlFor="answer">Answer</StyledLabel>
      <StyledInput
        id="answer"
        name="answer"
        type="text"
        required
        defaultValue={actionMode === "edit" ? currentFlashcard.answer : ""}
      />
      <StyledLabel htmlFor="collection">Collection</StyledLabel>
      <StyledSelect
        id="collection"
        name="collectionId"
        required
        defaultValue={
          actionMode === "edit" ? currentFlashcard.collectionId : ""
        }
      >
        <option value="">--Please choose a collection:--</option>
        {collections.map((collection) => {
          return (
            <option key={collection.id} value={collection.id}>
              {collection.title}
            </option>
          );
        })}
      </StyledSelect>
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

const StyledForm = styled.form`
  width: 20rem;
  margin: 0 auto;
  padding: 20px 10px 10px 10px;
  border: 1px solid #000;
  border-top: 0;
  border-radius: 0 0 10px 10px;
`;

const StyledFormHeadline = styled.h2`
  text-align: center;
`;

const StyledLabel = styled.label`
  display: block;
  padding: 10px 0 2px 0;
  font-size: 0.9rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 1.5rem;
`;

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  height: 1.5rem;
`;
