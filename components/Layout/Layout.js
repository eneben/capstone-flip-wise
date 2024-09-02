import styled from "styled-components";
import Link from "next/link";
import Logo from "@/public/Logo_BrainStack.svg";
import Menu from "../Menu/Menu";
import Plus from "@/public/icons/Plus.svg";
import RoundButton from "../Buttons/RoundButton";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";

export default function Layout({
  children,
  collections,
  actionMode,
  changeActionMode,
  currentFlashcard,
  handleCreateFlashcard,
  handleEditFlashcard,
}) {
  return (
    <>
      <MainContainer>{children}</MainContainer>
      <StyledHeader>
        <Link href="/">
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </Link>

        {actionMode === "create" && (
          <FormFlashcard
            collections={collections}
            headline="Create new Flashcard"
            actionMode={actionMode}
            changeActionMode={changeActionMode}
            currentFlashcard={currentFlashcard}
            onSubmitFlashcard={handleCreateFlashcard}
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
          />
        )}

        <FormToggleContainer>
          <RoundButton
            type="button"
            content={<Plus />}
            variant="formToggle"
            name="menu"
            onClick={() => {
              changeActionMode("create");
            }}
            actionMode
          />
        </FormToggleContainer>

        <Menu collections={collections} />
      </StyledHeader>
    </>
  );
}

const MainContainer = styled.main`
  margin: 0 auto;
  max-width: 30rem;
  padding: 100px 1rem 4.5rem 1rem;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100px;
  padding: 15px 20px;
  background-color: #fff;
  border-bottom: 1px solid #000;
  box-shadow: 0px 0px 10px #000;
`;

const LogoContainer = styled.div`
  width: 70px;
`;

const FormToggleContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  position: absolute;
  top: 80px;
`;
