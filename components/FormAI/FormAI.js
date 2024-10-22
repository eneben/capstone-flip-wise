import styled from "styled-components";
import { useState } from "react";
import FormInput from "../FormFlashcard/FormInput";
import RoundButton from "../Buttons/RoundButton";
import InfoSmall from "@/public/icons/InfoSmall.svg";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import RegularButton from "../Buttons/RegularButton";
import { StyledFormHeadline } from "@/styledComponents";

export default function FormAI({
  collections,
  changeShowInfoModal,
  onAddCollection,
  onSubmit,
  startClosingForm,
}) {
  const maxTextInputLength = 8000;

  const [remainingTextInputLength, setRemainingTextInputLength] =
    useState(maxTextInputLength);

  function handleTextInputChange(event) {
    const textInputLength = event.target.value.length;
    setRemainingTextInputLength(maxTextInputLength - textInputLength);
  }

  const [showNewCollectionFields, setShowNewCollectionFields] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const collectionId =
      data.collectionId ||
      (await onAddCollection({
        title: data.collectionName,
        color: data.collectionColor,
      }));

    onSubmit({
      textInput: data.textInput,
      numberOfFlashcards: data.numberOfFlashcards,
      collectionId,
    });
    startClosingForm();
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <StyledFormWrapper>
        <StyledFormHeadline>
          Text to Flashcards{" "}
          <RoundButton
            type="button"
            variant="infoSmall"
            onClick={() => changeShowInfoModal()}
          >
            <InfoSmall />
          </RoundButton>
        </StyledFormHeadline>

        <StyledLabel htmlFor="text-input">Text input</StyledLabel>
        <StyledTextArea
          id="text-input"
          name="textInput"
          wrap="soft"
          required
          onChange={handleTextInputChange}
        />

        <StyledCharacterCounter>
          Remaining characters:{" "}
          <StyledCharacterCounterNumber
            $negativeCount={remainingTextInputLength < 0}
          >
            {remainingTextInputLength}
          </StyledCharacterCounterNumber>
        </StyledCharacterCounter>

        <StyledLabel htmlFor="number-of-flashcards">
          Number of Flashcards (max. 40)
        </StyledLabel>
        <StyledInput
          id="number-of-flashcards"
          type="number"
          name="numberOfFlashcards"
          max="40"
        />

        {!showNewCollectionFields && (
          <>
            <StyledLabel htmlFor="collection">Existing Collection</StyledLabel>
            <StyledSelect id="collection" name="collectionId" required>
              <option value="">--Please choose a collection:--</option>
              {collections.map((collection) => {
                return (
                  <option key={collection._id} value={collection._id}>
                    {collection.title}
                  </option>
                );
              })}
            </StyledSelect>

            <StyledButtonWrapper>
              <RegularButton
                variant="collectionToggle"
                onClick={() => setShowNewCollectionFields(true)}
              >
                + Add New Collection
              </RegularButton>
            </StyledButtonWrapper>
          </>
        )}

        {showNewCollectionFields && (
          <>
            <NewCollectionWrapper>
              <CollectionNameWrapper>
                <StyledLabel htmlFor="collectionName">
                  New Collection
                </StyledLabel>
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

            <StyledButtonWrapper>
              <RegularButton
                variant="collectionToggle"
                onClick={() => setShowNewCollectionFields(false)}
              >
                Choose Existing Collection
              </RegularButton>
            </StyledButtonWrapper>
          </>
        )}

        {remainingTextInputLength < 0 && (
          <StyledTextWarning>
            Please shorten the text before submitting.
          </StyledTextWarning>
        )}
        <ButtonWrapper>
          <RegularButton
            type="submit"
            variant="submit"
            disabled={remainingTextInputLength < 0}
          >
            Submit
          </RegularButton>
        </ButtonWrapper>
      </StyledFormWrapper>
    </form>
  );
}

const StyledFormWrapper = styled.div`
  padding: 0 10px 0 10px;
`;

const StyledLabel = styled.label`
  display: block;
  padding: 10px 0 2px 0;
  font: var(--form-label);
`;

const StyledTextWarning = styled.p`
  color: var(--primary-red);
  text-align: center;
  padding: 10px 0 2px 0;
  font: var(--form-label);
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  max-height: 300px;
  resize: vertical;
  padding: 8px;
  border-radius: 2px;
  font: var(--form-input);
  overflow-y: scroll;
  scrollbar-width: 8px;
  scrollbar-color: var(--primary-neutral) #fff;

  &:focus {
    outline: 1px solid var(--primary-neutral);
  }
`;

const StyledCharacterCounter = styled.p`
  text-align: right;
  font-size: 0.75rem;
`;

const StyledCharacterCounterNumber = styled.span`
  color: ${({ $negativeCount }) =>
    $negativeCount ? "var(--primary-red)" : "#000"};
  font-weight: 600;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 1.5rem;
  border: 1px solid var(--primary-neutral);
  border-radius: 2px;
  &:focus {
    outline: 1px solid var(--primary-neutral);
  }
`;

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  font: var(--form-input);
  color: #000;
  height: 1.5rem;
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

const StyledButtonWrapper = styled.div`
  padding-top: 10px;
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
