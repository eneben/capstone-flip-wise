import styled from "styled-components";
import Link from "next/link";
import Logo from "@/public/Logo_BrainStack.svg";
import Menu from "../Menu/Menu";
import Plus from "@/public/icons/Plus.svg";
import RoundButton from "../Buttons/RoundButton";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";
import AiInfoModal from "../AiInfoModal/AiInfoModal";
import FormCollection from "@/components/FormCollection/FormCollection";
import Image from "next/image";
import TemporaryFlashcardsModal from "../TemporaryFlashcardsModal/TemporaryFlashcardsModal";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { uid } from "uid";

export default function Layout({
  children,
  collections,
  actionMode,
  changeActionMode,
  currentFlashcard,
  currentCollection,
  handleCreateFlashcard,
  handleEditFlashcard,
  handleEditCollection,
  changeFlashcardSelection,
  handleAddCollection,
  getAllFlashcardsFromCollection,
  isImageEnlarged,
  handleCloseEnlargedImage,
  imageUrl,
}) {
  const { data: session } = useSession();

  const [isFormClosing, setIsFormClosing] = useState(false);

  const [showInfoModal, setShowInfoModal] = useState(false);

  const cachedChangeActionMode = useCallback(changeActionMode, [
    changeActionMode,
  ]);

  const [temporaryFlashcards, setTemporaryFlashcards] = useState([]);

  const [showTemporaryFlashcardsModal, setShowTemporaryFlashcardsModal] =
    useState(false);

  const [abortController, setAbortController] = useState(null);

  function toggleTemporaryFlashcardIncluded(id) {
    setTemporaryFlashcards(
      temporaryFlashcards.map((temporaryFlashcard) => {
        return temporaryFlashcard.temporaryFlashcardId === id
          ? {
              ...temporaryFlashcard,
              isIncluded: !temporaryFlashcard.isIncluded,
            }
          : temporaryFlashcard;
      })
    );
  }

  function handleDeleteTemporaryFlashcards() {
    setTemporaryFlashcards([]);
    setShowTemporaryFlashcardsModal(false);
  }

  async function getAiFlashcards(promptData) {
    const controller = new AbortController();
    setAbortController(controller);

    setShowTemporaryFlashcardsModal(true);
    try {
      const response = await fetch("/api/ai-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData),
        signal: controller.signal,
      });

      const collectionResponse = await fetch("/api/collections");
      const collections = await collectionResponse.json();

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      const existingCollection = collections.find(
        (collection) => collection._id === promptData.collectionId
      );
      setTemporaryFlashcards(
        data.map((temporaryFlashcard) => {
          return {
            ...temporaryFlashcard,
            temporaryFlashcardId: uid(),
            collectionName: existingCollection.title,
            collectionColor: existingCollection.color,
            isIncluded: true,
          };
        })
      );
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Flashcard generation was cancelled.");
      } else {
        console.error("Error:", error);
      }
    } finally {
      setAbortController(null);
    }
  }

  function cancelFlashcardGeneration() {
    if (abortController) {
      abortController.abort();
    }
    setShowTemporaryFlashcardsModal(false);
  }

  function changeShowInfoModal() {
    setShowInfoModal(!showInfoModal);
  }

  function handleToggleForm() {
    if (actionMode === "create") {
      setIsFormClosing(true);
    } else if (actionMode === "edit" || actionMode === "editCollection") {
      setIsFormClosing(true);
    } else {
      changeActionMode("create");
    }
  }

  useEffect(() => {
    if (isFormClosing) {
      const formTimeoutId = setTimeout(() => {
        cachedChangeActionMode("default");
        setIsFormClosing(false);
      }, 400);
      return () => clearTimeout(formTimeoutId);
    }
  }, [isFormClosing, cachedChangeActionMode]);

  function startClosingForm() {
    setIsFormClosing(true);
  }

  return (
    <>
      <MainContainer>{children}</MainContainer>

      {isImageEnlarged && (
        <StyledOutgreyContainer>
          <StyledModal onClick={handleCloseEnlargedImage}>
            <StyledEnlargedImage
              src={imageUrl}
              alt="Enlarged Flashcard Image"
              width={500}
              height={500}
              priority={true}
            />
            <StyledButtonContainer>
              <RoundButton type="button" variant="delete">
                <MarkAsIncorrect />
              </RoundButton>
            </StyledButtonContainer>
          </StyledModal>
        </StyledOutgreyContainer>
      )}

      {showInfoModal && (
        <AiInfoModal changeShowInfoModal={changeShowInfoModal} />
      )}

      {showTemporaryFlashcardsModal && (
        <TemporaryFlashcardsModal
          temporaryFlashcards={temporaryFlashcards}
          toggleTemporaryFlashcardIncluded={toggleTemporaryFlashcardIncluded}
          handleDeleteTemporaryFlashcards={handleDeleteTemporaryFlashcards}
          cancelFlashcardGeneration={cancelFlashcardGeneration}
          onSubmitFlashcard={handleCreateFlashcard}
          onAddCollection={handleAddCollection}
        />
      )}

      {actionMode !== "default" && (
        <StyledOutsideClickArea onClick={handleToggleForm} />
      )}

      {actionMode === "create" && (
        <FormFlashcard
          getAiFlashcards={getAiFlashcards}
          collections={collections}
          headline="Create new Flashcard"
          actionMode={actionMode}
          currentFlashcard={currentFlashcard}
          onSubmitFlashcard={handleCreateFlashcard}
          isFormClosing={isFormClosing}
          startClosingForm={startClosingForm}
          onAddCollection={handleAddCollection}
          changeShowInfoModal={changeShowInfoModal}
        />
      )}

      {actionMode === "edit" && (
        <FormFlashcard
          getAiFlashcards={getAiFlashcards}
          collections={collections}
          headline="Edit Flashcard"
          actionMode={actionMode}
          currentFlashcard={currentFlashcard}
          onSubmitFlashcard={handleEditFlashcard}
          isFormClosing={isFormClosing}
          startClosingForm={startClosingForm}
          onAddCollection={handleAddCollection}
        />
      )}

      {actionMode === "editCollection" && (
        <FormCollection
          headline="Edit Collection"
          actionMode={actionMode}
          currentCollection={currentCollection}
          onEditCollection={handleEditCollection}
          isFormClosing={isFormClosing}
          startClosingForm={startClosingForm}
        />
      )}

      <FormToggleContainer>
        <FormButtonShadow />
      </FormToggleContainer>

      <StyledHeader>
        <StyledHeaderContentContainer>
          <HiddenHeadline>BRAIN STACK</HiddenHeadline>
          <Link
            href="/"
            onClick={() => {
              setIsFormClosing(true);
              changeFlashcardSelection("all");
            }}
          >
            <LogoContainer>
              <Logo />
            </LogoContainer>
          </Link>

          <FormToggleContainer>
            <RoundButton
              type="button"
              variant="formToggle"
              name="menu"
              onClick={handleToggleForm}
              disabled={!session}
              isRotate={
                actionMode === "create" ||
                actionMode === "edit" ||
                actionMode === "editCollection"
              }
            >
              <Plus />
            </RoundButton>
          </FormToggleContainer>

          <Menu
            collections={collections}
            startClosingForm={startClosingForm}
            changeFlashcardSelection={changeFlashcardSelection}
            getAllFlashcardsFromCollection={getAllFlashcardsFromCollection}
          />
        </StyledHeaderContentContainer>
      </StyledHeader>
    </>
  );
}

const MainContainer = styled.main`
  margin: 0 auto;
  min-height: 100vh;
  max-width: 800px;
  padding: 100px 1rem 4.5rem 1rem;
  background-color: #fff;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100px;
  background-color: var(--secondary-light-grey);
  box-shadow: 0 2px 10px #000;
`;

const StyledHeaderContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  width: 100vw;
  max-width: 800px;
  background-color: #fff;
  height: 100px;
`;

const HiddenHeadline = styled.h1`
  position: fixed;
  color: #fff;
  visibility: hidden;
`;

const LogoContainer = styled.div`
  width: 110px;
`;

const FormToggleContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  top: 80px;
`;

const StyledOutsideClickArea = styled.div`
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0;
`;

const FormButtonShadow = styled.div`
  width: 40px;
  height: 40px;
  position: fixed;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 3px 10px #000;
`;

const StyledOutgreyContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  background-color: #00000088;
`;

const StyledModal = styled.article`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  max-width: 500px;
  padding: 40px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: #fff;
  z-index: 2;
  animation: modalPop 0.3s ease-out;

  @keyframes modalPop {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const StyledEnlargedImage = styled(Image)`
  object-fit: contain;
  max-width: 100%;
  height: auto;
`;

const StyledButtonContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 3;
`;
