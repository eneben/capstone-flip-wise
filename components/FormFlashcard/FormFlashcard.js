import { styled, css, keyframes } from "styled-components";
import { useState } from "react";
import FormManual from "../FormManual/FormManual";
import FormAI from "../FormAI/FormAI";

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
  const [formMode, setFormMode] = useState("manual");

  return (
    <>
      <StyledFormCard $isFormClosing={isFormClosing}>
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
            onSubmit={onSubmitFlashcard}
            startClosingForm={startClosingForm}
            onAddCollection={onAddCollection}
          />
        )}

        {formMode === "ai" && (
          <FormAI
            collections={collections}
            changeShowInfoModal={changeShowInfoModal}
            onAddCollection={onAddCollection}
            onSubmit={getAiFlashcards}
            startClosingForm={startClosingForm}
          />
        )}
      </StyledFormCard>
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

const StyledFormCard = styled.div`
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
  color: #000;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  padding: 15px 0 15px 0;
  box-shadow: ${({ $active, $rightButton, $leftButton }) => {
    if ($active) {
      return "";
    }
    if ($rightButton) {
      return "inset 5px -5px 5px -5px #000;";
    }
    if ($leftButton) {
      return "inset -5px -5px 5px -5px #000;";
    }
  }};
`;
