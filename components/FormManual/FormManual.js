import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import FormInput from "../FormFlashcard/FormInput";
import Upload from "@/public/icons/Upload.svg";
import Image from "next/image";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
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

  function handleImageClose() {
    handleCloseImagePreview();
    setShowOriginalImage(false);
    document.getElementById("image").value = null;
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

    const imageUrl = url || currentFlashcard?.imageUrl || null;

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
          {(imageUploaded ||
            (actionMode === "edit" &&
              currentFlashcard?.imageUrl &&
              showOriginalImage)) && (
            <StyledImageWrapper onClick={handleImageClose}>
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
                (actionMode === "edit" &&
                  currentFlashcard?.imageUrl &&
                  showOriginalImage)
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
  height: auto;
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
