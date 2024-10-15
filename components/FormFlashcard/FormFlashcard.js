import { styled, css, keyframes } from "styled-components";
import { useState } from "react";
import FormManual from "../FormManual/FormManual";
import FormAI from "../FormAI/FormAI";

export default function FormFlashcard({
  collections,
  headline,
  actionMode,
  changeActionMode,
  currentFlashcard,
  onSubmitFlashcard,
  isFormClosing,
  startClosingForm,
  onAddCollection,
  getAiFlashcards,
  changeShowInfoModal,
  uploadImage,
}) {
  const [showNewCollectionFields, setShowNewCollectionFields] = useState(false);
  const [formMode, setFormMode] = useState("ai");

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
      const formData = Object.fromEntries(new FormData(event.target));
      const { collectionName, collectionColor, question, answer } = formData;
      let newFlashcard;

      const imageFile = formData.get("image"); // Hole die ausgewählte Bild-Datei
      let imageUrl = ""; // Standardleerer Wert für die Bild-URL

      if (imageFile) {
        // Falls ein Bild existiert
        try {
          imageUrl = await uploadImage(imageFile); // Lade das Bild hoch und speichere die URL
        } catch (error) {
          console.error("Image upload failed:", error);
          return; // Stoppe den Prozess, wenn der Bild-Upload fehlschlägt
        }
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
        newFlashcard = { ...formData, level: 1, imageUrl };
      }

      onSubmitFlashcard(newFlashcard);
      setShowNewCollectionFields(false);
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
            uploadImage={uploadImage}
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
