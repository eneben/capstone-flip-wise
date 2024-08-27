import styled from "styled-components";
import { RegularButton } from "../Button/Button";

export default function FormFlashcard({
  collections,
  onCreateFlashcard,
  headline,
  isEdit,
  setIsEdit,
  currentFlashcard,
  onEditFlashcard,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newFlashcard = Object.fromEntries(formData);
    const updatedFlashcard = { ...newFlashcard, id: currentFlashcard.id };

    {
      isEdit
        ? onEditFlashcard(updatedFlashcard)
        : onCreateFlashcard(newFlashcard);
    }

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
        defaultValue={isEdit ? currentFlashcard.question : ""}
      />
      <StyledLabel htmlFor="answer">Answer</StyledLabel>
      <StyledInput
        id="answer"
        name="answer"
        type="text"
        required
        defaultValue={isEdit ? currentFlashcard.answer : ""}
      />
      <StyledLabel htmlFor="collection">Collection</StyledLabel>
      <StyledSelect
        id="collection"
        name="collectionId"
        required
        defaultValue={isEdit ? currentFlashcard.collectionId : ""}
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
      <SubmitButtonWrapper>
        <RegularButton type="submit" content="Submit" variant="submit" />
        <RegularButton
          type="button"
          content="Cancel"
          variant="confirm"
          onClick={() => setIsEdit(false)}
        />
      </SubmitButtonWrapper>
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

const SubmitButtonWrapper = styled.div`
  display: flex;
  padding: 20px 0 10px 0;
  justify-content: center;
  gap: 10px;
`;
