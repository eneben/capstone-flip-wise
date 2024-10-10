import styled from "styled-components";
import Link from "next/link";
import Logo from "@/public/Logo_BrainStack.svg";
import Menu from "../Menu/Menu";
import Plus from "@/public/icons/Plus.svg";
import RoundButton from "../Buttons/RoundButton";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";
import FormCollection from "@/components/FormCollection/FormCollection";
import { useState, useEffect, useCallback } from "react";

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
}) {
  const [isFormClosing, setIsFormClosing] = useState(false);

  const cachedChangeActionMode = useCallback(changeActionMode, [
    changeActionMode,
  ]);

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
      }, 490);
      return () => clearTimeout(formTimeoutId);
    }
  }, [isFormClosing, cachedChangeActionMode]);

  function startClosingForm() {
    setIsFormClosing(true);
  }

  return (
    <>
      <MainContainer>{children}</MainContainer>

      {actionMode !== "default" && (
        <StyledOutsideClickArea onClick={handleToggleForm} />
      )}

      {actionMode === "create" && (
        <FormFlashcard
          collections={collections}
          headline="Create new Flashcard"
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          currentFlashcard={currentFlashcard}
          onSubmitFlashcard={handleCreateFlashcard}
          isFormClosing={isFormClosing}
          onAddCollection={handleAddCollection}
        />
      )}

      {actionMode === "edit" && (
        <FormFlashcard
          collections={collections}
          headline="Edit Flashcard"
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          currentFlashcard={currentFlashcard}
          onSubmitFlashcard={handleEditFlashcard}
          isFormClosing={isFormClosing}
          onAddCollection={handleAddCollection}
        />
      )}

      {actionMode === "editCollection" && (
        <FormCollection
          headline="Edit Collection"
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          currentCollection={currentCollection}
          onEditCollection={handleEditCollection}
          isFormClosing={isFormClosing}
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
