import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import FormInput from "../FormFlashcard/FormInput";
import UploadButton from "./UploadButton";
import ImagePreview from "./ImagePreview";
import { StyledFormHeadline } from "@/styledComponents";
import { useState } from "react";

export default function FormManual({
  collections,
  headline,
  actionMode,
  currentFlashcard,
  startClosingForm,
  onSubmit,
  onAddCollection,
}) {
  const [showOriginalImage, setShowOriginalImage] = useState(true);
  const [showNewCollectionFields, setShowNewCollectionFields] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [shouldRemoveImage, setShouldRemoveImage] = useState(false);

  const showUploadPreview =
    imageUploaded ||
    (actionMode === "edit" && currentFlashcard?.imageUrl && showOriginalImage);

  function handleImageClose() {
    handleCloseImagePreview();
    setShowOriginalImage(false);
    setImage(null);
  }

  function resetImageState() {
    setImage(null);
    setImageUploaded(false);
    setShouldRemoveImage(false);
  }

  function uploadImage(file) {
    if (!file) {
      console.log("No file found");
      return;
    }
    setImage(file);
    setImageUploaded(true);
    setShouldRemoveImage(false);
  }

  function handleCloseImagePreview() {
    resetImageState();
    setShouldRemoveImage(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let url = null;

    if (imageUploaded && image) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append("image", image);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }
        const responseData = await response.json();
        url = responseData.url;
      } catch (error) {
        console.error("An error occurred during upload:", error);
        return;
      }
    }

    const imageUrl = shouldRemoveImage
      ? null
      : url || currentFlashcard?.imageUrl || null;

    const collectionId =
      data.collectionId ||
      (await onAddCollection({
        title: data.collectionName,
        color: data.collectionColor,
      }));

    onSubmit({ ...data, collectionId, imageUrl });
    startClosingForm();
    resetImageState();
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
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

        {!showNewCollectionFields && (
          <>
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
              {/* <option value="newCollection">+ Add New Collection</option> */}
              {collections.map((collection) => {
                return (
                  <option key={collection._id} value={collection._id}>
                    {collection.title}
                  </option>
                );
              })}
            </StyledSelect>

            <button onClick={() => setShowNewCollectionFields(true)}>
              Add new collection
            </button>
          </>
        )}

        {showNewCollectionFields && (
          <>
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
            <button onClick={() => setShowNewCollectionFields(false)}>
              Choose existing collection
            </button>
          </>
        )}

        <StyledImageInputWrapper>
          {showUploadPreview ? (
            <ImagePreview
              handleImageClose={handleImageClose}
              imageUploaded={imageUploaded}
              image={image}
              currentFlashcard={currentFlashcard}
            />
          ) : (
            <UploadButton uploadImage={uploadImage} />
          )}
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
