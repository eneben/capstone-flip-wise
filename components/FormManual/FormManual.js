import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import FormInput from "../FormFlashcard/FormInput";
import Upload from "@/public/icons/Upload.svg";
import Image from "next/image";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";

export default function FormManual({
  collections,
  headline,
  actionMode,
  currentFlashcard,
  onCollectionChange,
  showNewCollectionFields,
  startClosingForm,
  uploadImage,
  image,
  imageUploaded,
  handleCloseImagePreview,
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
          maxLength="50"
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

        <StyledImageInputWrapper>
          {(imageUploaded ||
            (actionMode === "edit" && currentFlashcard?.imageUrl)) && (
            <StyledImageWrapper onClick={handleCloseImagePreview}>
              <StyledIconWrapper>
                <MarkAsIncorrect />
              </StyledIconWrapper>
              <StyledImagePreview
                src={
                  imageUploaded
                    ? URL.createObjectURL(image)
                    : currentFlashcard.imageUrl
                }
                alt="Preview of the image"
                sizes="300px"
                fill
              />
            </StyledImageWrapper>
          )}
          <>
            <StyledImageInput
              $hidden={
                imageUploaded ||
                (actionMode === "edit" && currentFlashcard?.imageUrl)
              }
            >
              <IconTextWrapper>
                <Upload />
                Upload Image
              </IconTextWrapper>
            </StyledImageInput>
            <HiddenImageInput
              name="image"
              type="file"
              accept="image/*"
              id="image"
              onChange={(event) => uploadImage(event.target.files[0])}
            />
          </>
        </StyledImageInputWrapper>
      </StyledFormWrapper>

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

const StyledImageInputWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
  padding-top: 20px;
`;

const HiddenImageInput = styled.input.attrs({
  type: "file",
})`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const StyledImageInput = styled.label`
  padding: 8px 14px;
  background-color: var(--secondary-grey);
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  display: ${({ $hidden }) => ($hidden ? "none" : "inline-block")};
`;

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  position: relative;
  flex-direction: row-reverse;
  padding: 5px;
  overflow: auto;
  margin-top: 20px;
  border: 1px solid var(--primary-neutral);
  border-radius: 2px;
`;

const StyledImagePreview = styled(Image)`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const StyledIconWrapper = styled.div`
  color: #fff;
  background-color: var(--primary-neutral);
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;
