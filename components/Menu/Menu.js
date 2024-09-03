import { useState, useEffect } from "react";
import MenuIcon from "@/public/icons/Menu.svg";
import SubMenuArrow from "@/public/icons/SubMenuArrow.svg";
import styled, { keyframes, css } from "styled-components";
import Link from "next/link";

export default function Menu({ collections, actionMode, startClosingForm }) {
  const [isMenu, setIsMenu] = useState(false);
  const [isCollections, setIsCollections] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isCollectionsClosing, setIsCollectionsClosing] = useState(false);

  function handleToggleMenu(event) {
    event.stopPropagation();
    if (!isMenu) {
      startClosingForm();
      setIsMenu(true);
    } else {
      startClosingMenu();
    }
    startClosingCollections();
  }

  function startClosingMenu() {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuClosing(false);
      setIsMenu(false);
    }, 300);
  }

  function handleToggleCollections(event) {
    event.stopPropagation();
    if (!isCollections) {
      setIsCollections(true);
    } else {
      startClosingCollections();
    }
  }

  function startClosingCollections() {
    setIsCollectionsClosing(true);
    setTimeout(() => {
      setIsCollectionsClosing(false);
      setIsCollections(false);
    }, 300);
  }

  return (
    <>
      <StyledButton type="button" name="menuButton" onClick={handleToggleMenu}>
        <MenuIcon />
      </StyledButton>

      {isMenu && <StyledOutsideClickArea onClick={handleToggleMenu} />}

      {isMenu && (
        <StyledNavigation
          id="menu"
          $isMenu={actionMode === "menu"}
          $isMenuClosing={isMenuClosing}
        >
          <StyledNavigationList>
            <StyledNavigationListItem>
              <StyledNavigationLink href="/">Collections</StyledNavigationLink>
              <StyledSubMenuArrow
                $isRotate={isCollections}
                onClick={handleToggleCollections}
              />
            </StyledNavigationListItem>
            {isCollections && (
              <StyledSubNavigationList>
                {collections.map((collection) => {
                  return (
                    <StyledSubNavigationListItem
                      key={collection.id}
                      $isCollectionsClosing={isCollectionsClosing}
                    >
                      <StyledSubNavigationLink href="#">
                        {collection.title}
                      </StyledSubNavigationLink>
                    </StyledSubNavigationListItem>
                  );
                })}
              </StyledSubNavigationList>
            )}
          </StyledNavigationList>
        </StyledNavigation>
      )}
    </>
  );
}

const menuAnimationIn = keyframes`
0% { right: -220px; }
100% { right: 0px; }
`;

const menuAnimationOut = keyframes`
0% { right: 0px; }
100% { right: -220px; }
`;

const subMenuAnimationOpen = keyframes`
0% { height: 0px; opacity: 0;}
100% { height: 35px; opacity: 1;}
`;

const subMenuAnimationClose = keyframes`
0% { height: 35px; opacity: 1;}
100% { height: 0px; opacity: 0;}
`;

const StyledButton = styled.button`
  z-index: 1;
  background-color: #fff;
  border: none;
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
  right: 0px;
  width: 220px;
  background-color: #fff;
  border: 1px solid #000;
  border-top: none;
  border-right: none;
  box-shadow: 0px 0px 10px #000;

  &::before {
    content: "";
    position: absolute;
    top: -100px;
    right: 0;
    width: 240px;
    height: 100px;
    background-color: #fff;
    border-bottom: 1px solid #000;
  }
`;

const StyledNavigationList = styled.ul`
  list-style: none;
  line-height: 2.5;
`;

const StyledNavigationListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  text-align: center;
  color: #fff;
  background-color: #000;
`;

const StyledSubNavigationList = styled.ul`
  font-size: 0.8rem;
  list-style: none;
`;

const StyledSubNavigationListItem = styled.li`
  animation: ${(props) =>
    props.$isCollectionsClosing
      ? css`
          ${subMenuAnimationClose} 0.3s ease-out
        `
      : css`
          ${subMenuAnimationOpen} 0.3s ease-out
        `};
  height: 35px;
  border-top: 1px solid #000;
  text-align: center;

  &:nth-of-type(1) {
    border-top: 0;
  }
`;

const StyledNavigationLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const StyledSubNavigationLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const StyledSubMenuArrow = styled(SubMenuArrow)`
  rotate: ${(props) => (props.$isRotate ? "1.5turn" : "0")};
  transition: 0.3s ease;
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
