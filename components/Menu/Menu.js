import { useEffect, useState } from "react";
import MenuIcon from "@/public/icons/Menu.svg";
import MenuItem from "../MenuItem/MenuItem";
import styled, { keyframes, css } from "styled-components";

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
      <StyledButton type="button" name="menuButton" onClick={handleToggleMenu}>
        <MenuIcon />
      </StyledButton>

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
          </StyledNavigationList>
        </StyledNavigation>
      )}
      {isMenu && <StyledCover />}
    </StyledMenuContainer>
  );
}

const menuAnimationIn = keyframes`
0% { top: -76px; }
100% { top: 100px; }
`;

const menuAnimationOut = keyframes`
0% { top: 100px; }
100% { top: -76px; }
`;

const subMenuAnimationOpen = keyframes`
0% { height: 0px; opacity: 0;}
100% { height: 35px; opacity: 1;}
`;

const subMenuAnimationClose = keyframes`
0% { height: 35px; opacity: 1;}
100% { height: 0px; opacity: 0;}
`;

const StyledMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
