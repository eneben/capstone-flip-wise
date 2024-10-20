import { styled, css, keyframes } from "styled-components";
import { useState } from "react";
import FormManual from "../FormManual/FormManual";
import FormAI from "../FormAI/FormAI";
import { set } from "mongoose";

export default function FormFlashcard({
  collections,
  headline,
  actionMode,
  currentFlashcard,
  onSubmitFlashcard,
  isFormClosing,
  startClosingForm,
  onAddCollection,
  getAiFlashcards,
  changeShowInfoModal,
}) {
  const [showNewCollectionFields, setShowNewCollectionFields] = useState(false);
  const [formMode, setFormMode] = useState("manual");
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [shouldRemoveImage, setShouldRemoveImage] = useState(false);

  function resetImageState() {
    setImage(null);
    setImageUploaded(false);
    setShouldRemoveImage(false);
  }

  function handleImageUpload(file) {
    if (file) {
      setImage(file);
      setImageUploaded(true);
      setShouldRemoveImage(false);
    }
  }

  function handleCloseImagePreview() {
    resetImageState();
    setShouldRemoveImage(true);
  }

  function handleCollectionChange(event) {
    if (event.target.value === "newCollection") {
      setShowNewCollectionFields(true);
    } else {
      setShowNewCollectionFields(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formMode === "manual") {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      const {
        collectionName,
        collectionColor,
        question,
        answer,
        collectionId,
      } = data;

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

      let newFlashcard;
      let imageUrl = null;

      if (actionMode === "edit") {
        if (imageUploaded && url) {
          imageUrl = url;
        } else if (!shouldRemoveImage && currentFlashcard?.imageUrl) {
          imageUrl = currentFlashcard.imageUrl;
        }
      } else {
        imageUrl = imageUploaded ? url : null;
      }

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
          imageUrl,
        };
      } else {
        newFlashcard = {
          collectionId,
          question,
          answer,
          level: 1,
          imageUrl,
        };
      }

      onSubmitFlashcard(newFlashcard);
      setShowNewCollectionFields(false);
      resetImageState();
      event.target.reset();
    }

    if (formMode === "ai") {
      const formData = Object.fromEntries(new FormData(event.target));
      const {
        collectionId,
        collectionName,
        collectionColor,
        textInput,
        numberOfFlashcards,
      } = formData;
      getAiFlashcards(
        collectionId,
        collectionName,
        collectionColor,
        textInput,
        numberOfFlashcards
      );
    }
    startClosingForm();
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit} $isFormClosing={isFormClosing}>
        <StyledFormNavigation>
          <StyledFormButton
            type="button"
            $leftButton
            $active={formMode === "manual"}
            onClick={() => setFormMode("manual")}
          >
            Manual Entry
          </StyledFormButton>
          <StyledFormButton
            type="button"
            $rightButton
            $active={formMode === "ai"}
            onClick={() => setFormMode("ai")}
          >
            AI Generation
          </StyledFormButton>
        </StyledFormNavigation>

        {formMode === "manual" && (
          <FormManual
            collections={collections}
            headline={headline}
            actionMode={actionMode}
            currentFlashcard={currentFlashcard}
            isFormClosing={isFormClosing}
            onSubmit={handleSubmit}
            onCollectionChange={handleCollectionChange}
            showNewCollectionFields={showNewCollectionFields}
            startClosingForm={startClosingForm}
            uploadImage={handleImageUpload}
            image={image}
            imageUploaded={imageUploaded}
            handleCloseImagePreview={handleCloseImagePreview}
          />
        )}

        {formMode === "ai" && (
          <FormAI
            collections={collections}
            onCollectionChange={handleCollectionChange}
            showNewCollectionFields={showNewCollectionFields}
            changeShowInfoModal={changeShowInfoModal}
          />
        )}
      </StyledForm>
    </>
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
  align-items: center;
  background-color: #fff;
  border-top: 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 0px 10px #000;
`;

const StyledFormNavigation = styled.nav`
  width: 100%;
`;

const StyledFormButton = styled.button`
  width: 50%;
  background-color: #fff;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  padding: 15px 0 15px 0;
  box-shadow: ${({ $active, $rightButton, $leftButton }) =>
    !$active && $rightButton
      ? "inset 5px -5px 5px -5px #000;"
      : !$active && $leftButton
      ? "inset -5px -5px 5px -5px #000;"
      : ""};
`;
