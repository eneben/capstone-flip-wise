import { useEffect, useState } from "react";
import MenuIcon from "@/public/icons/Menu.svg";
import MenuItem from "../MenuItem/MenuItem";
import styled, { keyframes, css } from "styled-components";
import Login from "../Login/Login";

export default function Menu({
  collections,
  startClosingForm,
  changeFlashcardSelection,
  getAllFlashcardsFromCollection,
}) {
  const [isMenu, setIsMenu] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  const [submenuMode, setSubmenuMode] = useState("default");
  const [closingTrigger, setClosingTrigger] = useState(false);

  function changeSubmenuMode(mode) {
    setSubmenuMode(mode);
  }

  function handleToggleMenu() {
    if (!isMenu) {
      startClosingForm();
      setIsMenu(true);
    } else {
      setIsMenuClosing(true);
      setClosingTrigger(!closingTrigger);
    }
  }

  useEffect(() => {
    if (isMenuClosing) {
      const menuTimeoutId = setTimeout(() => {
        setIsMenu(false);
        setIsMenuClosing(false);
        changeSubmenuMode("default");
      }, 280);
      return () => clearTimeout(menuTimeoutId);
    }
  }, [isMenuClosing]);

  return (
    <StyledMenuContainer>
      <StyledButtonSection>
        <Login position="header" />

        <StyledButton
          type="button"
          name="menuButton"
          onClick={handleToggleMenu}
        >
          <MenuIcon />
        </StyledButton>
      </StyledButtonSection>

      {isMenu && <StyledOutsideClickArea onClick={handleToggleMenu} />}

      {isMenu && (
        <StyledNavigation id="menu" $isMenuClosing={isMenuClosing}>
          <StyledNavigationList>
            <MenuItem
              content="Home"
              menuItemName="home"
              collections={collections}
              hasSubmenu={false}
              page=""
              changeSubmenuMode={changeSubmenuMode}
              onToggleMenu={handleToggleMenu}
              changeFlashcardSelection={changeFlashcardSelection}
            />

            <MenuItem
              content="Learning Mode"
              menuItemName="learning"
              collections={collections}
              hasSubmenu={true}
              page="learning"
              submenuMode={submenuMode}
              changeSubmenuMode={changeSubmenuMode}
              onToggleMenu={handleToggleMenu}
              changeFlashcardSelection={changeFlashcardSelection}
              getAllFlashcardsFromCollection={getAllFlashcardsFromCollection}
              closingTrigger={closingTrigger}
            />

            <MenuItem
              content="Training Mode"
              menuItemName="training"
              collections={collections}
              hasSubmenu={true}
              page="training"
              submenuMode={submenuMode}
              changeSubmenuMode={changeSubmenuMode}
              onToggleMenu={handleToggleMenu}
              changeFlashcardSelection={changeFlashcardSelection}
              getAllFlashcardsFromCollection={getAllFlashcardsFromCollection}
              closingTrigger={closingTrigger}
            />

            <MenuItem
              content="Gaming Mode"
              menuItemName="gaming"
              collections={collections}
              hasSubmenu={true}
              page="gaming"
              submenuMode={submenuMode}
              changeSubmenuMode={changeSubmenuMode}
              onToggleMenu={handleToggleMenu}
              changeFlashcardSelection={changeFlashcardSelection}
              getAllFlashcardsFromCollection={getAllFlashcardsFromCollection}
              closingTrigger={closingTrigger}
            />

            {/* <MenuItem
              content={<Login position="menu" />}
              menuItemName="login"
              page=""
              collections={collections}
              changeSubmenuMode={changeSubmenuMode} default
              onToggleMenu={handleToggleMenu} <--
              changeFlashcardSelection={changeFlashcardSelection} all
              getAllFlashcardsFromCollection={getAllFlashcardsFromCollection}
              closingTrigger={closingTrigger}
            /> */}

            <StyledMenuLogin
              onClick={() => {
                changeSubmenuMode("default");
                changeFlashcardSelection("all");
                handleToggleMenu();
              }}
            >
              <Login position="menu" />
            </StyledMenuLogin>
          </StyledNavigationList>
        </StyledNavigation>
      )}
      {isMenu && <StyledCover />}
    </StyledMenuContainer>
  );
}

const menuAnimationIn = keyframes`
0% { top: -120px; }
100% { top: 100px; }
`;

const menuAnimationOut = keyframes`
0% { top: 100px; }
100% { top: -120px; }
`;

const StyledMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledButtonSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StyledButton = styled.button`
  color: #000;
  width: 35px;
  height: 35px;
  z-index: 1;
  background-color: #fff;
  border: none;
`;

const StyledCover = styled.div`
  background-color: #fff;
  width: 200px;
  height: 100px;
  position: absolute;
  top: 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -10px;
    right: -10px;
    height: 100%;
    background-color: #fff;
  }
`;

const StyledNavigation = styled.nav`
  animation: ${(props) =>
    props.$isMenuClosing
      ? css`
          ${menuAnimationOut} 0.3s ease-out
        `
      : css`
          ${menuAnimationIn} 0.3s ease-out
        `};
  position: absolute;
  top: 100px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #000;
  border-top: none;
  border-right: none;
  box-shadow: 0px 3px 10px -2px #000;
`;

const StyledNavigationList = styled.ul`
  list-style: none;
  line-height: 2.5;
`;

const StyledOutsideClickArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0;
`;

const StyledMenuLogin = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  color: #fff;
  background-color: #000;
  height: 44px;
`;
