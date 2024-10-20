import styled from "styled-components";
import Link from "next/link";
import Logo from "@/public/Logo_BrainStack.svg";
import Menu from "../Menu/Menu";
import Plus from "@/public/icons/Plus.svg";
import RoundButton from "../Buttons/RoundButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";
import AiInfoModal from "../AiInfoModal/AiInfoModal";
import FormCollection from "@/components/FormCollection/FormCollection";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function Layout({
  getAiFlashcards,
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
  uploadImage,
  isImageEnlarged,
  handlehandleOpenEnlargeImage,
  handleCloseEnlargedImage,
  imageUrl,
}) {
  const [isFormClosing, setIsFormClosing] = useState(false);

  const [showInfoModal, setShowInfoModal] = useState(false);

  const cachedChangeActionMode = useCallback(changeActionMode, [
    changeActionMode,
  ]);

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
        setIsFormClosing(false);
        cachedChangeActionMode("default");
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

      {actionMode !== "default" && (
        <StyledOutsideClickArea onClick={handleToggleForm} />
      )}

      {actionMode === "create" && (
        <FormFlashcard
          getAiFlashcards={getAiFlashcards}
          collections={collections}
          headline="Create new Flashcard"
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          currentFlashcard={currentFlashcard}
          onSubmitFlashcard={handleCreateFlashcard}
          isFormClosing={isFormClosing}
          startClosingForm={startClosingForm}
          onAddCollection={handleAddCollection}
          changeShowInfoModal={changeShowInfoModal}
          uploadImage={uploadImage}
        />
      )}

      {actionMode === "edit" && (
        <FormFlashcard
          getAiFlashcards={getAiFlashcards}
          collections={collections}
          headline="Edit Flashcard"
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          currentFlashcard={currentFlashcard}
          onSubmitFlashcard={handleEditFlashcard}
          isFormClosing={isFormClosing}
          startClosingForm={startClosingForm}
          onAddCollection={handleAddCollection}
          uploadImage={uploadImage}
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
  padding: 15px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: #fff;
  opacity: 1;
  z-index: 2;
`;

const StyledEnlargedImage = styled(Image)`
  object-fit: contain;
  max-width: 100%;
  max-height: calc(90vh - 40px);
  width: auto;
  height: auto;
`;

const StyledButtonContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 3;
`;
