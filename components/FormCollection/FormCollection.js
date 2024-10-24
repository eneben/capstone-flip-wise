import styled, { keyframes, css } from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import FormInput from "../FormFlashcard/FormInput";
import { StyledFormHeadline } from "@/styledComponents";

export default function FormCollection({
  headline,
  actionMode,
  currentCollection,
  isFormClosing,
  onEditCollection,
  startClosingForm,
}) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target));
    const { collectionName, collectionColor } = formData;

    let updatedCollection = {
      ...currentCollection,
      title: collectionName,
      color: collectionColor,
    };

    await onEditCollection(updatedCollection);
    event.target.reset();
    startClosingForm();
  }

  return (
    <StyledForm onSubmit={handleSubmit} $isFormClosing={isFormClosing}>
      <StyledFormHeadlineWithoutPadding>
        {headline}
      </StyledFormHeadlineWithoutPadding>

      <NewCollectionWrapper>
        <CollectionNameWrapper>
          <StyledLabel htmlFor="collectionName">Collection Name</StyledLabel>
          <FormInput
            name="collectionName"
            maxLength="23"
            currentCollection={currentCollection}
            actionMode={actionMode}
          />
        </CollectionNameWrapper>
        <CollectionColorWrapper>
          <StyledLabel htmlFor="collectionColor">Color</StyledLabel>
          <StyledColorInput
            type="color"
            id="collectionColor"
            name="collectionColor"
            defaultValue={currentCollection?.color || "#000"}
            required
          />
        </CollectionColorWrapper>
      </NewCollectionWrapper>

      <ButtonWrapper>
        <RegularButton type="submit" variant="submit">
          Submit
        </RegularButton>
        {actionMode === "editCollection" && (
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
  width: 90vw;
  max-width: 500px;
  padding: 30px 10px 10px 10px;
  background-color: #fff;
  border-top: 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 0px 10px #000;
`;

const StyledFormHeadlineWithoutPadding = styled(StyledFormHeadline)`
  padding-top: 0;
`;

const StyledLabel = styled.label`
  display: block;
  padding: 10px 0 2px 0;
  font: var(--form-label);
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
