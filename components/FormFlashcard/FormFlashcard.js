import styled from "styled-components";

export default function FormFlashcard({ collections, onCreateFlashcard }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newFlashcard = Object.fromEntries(formData);

    onCreateFlashcard(newFlashcard);
    event.target.reset();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormHeadline>Create new flashcard</StyledFormHeadline>
      <StyledLabel htmlFor="question">Question</StyledLabel>
      <StyledInput id="question" name="question" type="text" required />
      <StyledLabel htmlFor="answer">Answer</StyledLabel>
      <StyledInput id="answer" name="answer" type="text" required />
      <StyledLabel htmlFor="collection">Collection</StyledLabel>
      <StyledSelect id="collection" name="collectionId" required>
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
        <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
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
`;

const StyledSubmitButton = styled.button`
  padding: 6px 12px 6px 12px;
  font-weight: 500;
  color: #fff;
  background-color: #000;
  border-style: none;
  border-radius: 4px;
`;
