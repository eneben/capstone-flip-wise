import SubMenuArrow from "@/public/icons/SubMenuArrow.svg";
import { useState, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import Link from "next/link";

export default function MenuItem({
  content,
  menuItemName,
  collections,
  hasSubmenu,
  page,
  submenuMode,
  changeSubmenuMode,
  onToggleMenu,
  changeFlashcardSelection,
  getAllFlashcardsFromCollection,
  closingTrigger,
}) {
  const [isCollectionsClosing, setIsCollectionsClosing] = useState(false);

  const cachedChangeSubmenuMode = useCallback(changeSubmenuMode, [
    changeSubmenuMode,
  ]);

  function toggleSubmenuMode() {
    if (submenuMode !== menuItemName) {
      changeSubmenuMode(menuItemName);
    } else {
      setIsCollectionsClosing(true);
    }
  }

  useEffect(() => {
    if (isCollectionsClosing) {
      const collectionsTimeoutId = setTimeout(() => {
        setIsCollectionsClosing(false);
        cachedChangeSubmenuMode("default");
      }, 280);
      return () => clearTimeout(collectionsTimeoutId);
    }
  }, [isCollectionsClosing, cachedChangeSubmenuMode]);

  useEffect(() => {
    setIsCollectionsClosing(true);
  }, [closingTrigger]);

  return (
    <>
      <StyledNavigationListItem>
        <StyledNavigationLink
          href={`/${page}`}
          onClick={() => {
            changeFlashcardSelection("all");
            onToggleMenu();
          }}
        >
          {content}
        </StyledNavigationLink>

        {hasSubmenu && (
          <StyledSubMenuArrow
            $isRotate={submenuMode === menuItemName}
            onClick={toggleSubmenuMode}
          />
        )}
      </StyledNavigationListItem>

      {submenuMode === menuItemName && (
        <StyledSubNavigationList>
          {collections.map((collection) => {
            return (
              <StyledSubNavigationListItem
                key={collection.id}
                $isCollectionsClosing={isCollectionsClosing}
              >
                <StyledSubNavigationLink
                  href={`/${page}/${collection.id}`}
                  onClick={() => {
                    changeFlashcardSelection("all");
                    onToggleMenu();
                  }}
                >
                  {collection.title} (
                  {getAllFlashcardsFromCollection(collection.id).length})
                </StyledSubNavigationLink>
              </StyledSubNavigationListItem>
            );
          })}
        </StyledSubNavigationList>
      )}
    </>
  );
}

const subMenuAnimationOpen = keyframes`
0% { height: 0px; opacity: 0;}
100% { height: 35px; opacity: 1;}
`;

const subMenuAnimationClose = keyframes`
0% { height: 35px; opacity: 1;}
100% { height: 0px; opacity: 0;}
`;

const StyledNavigationListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  color: #fff;
  background-color: #000;
`;

const StyledSubNavigationList = styled.ul`
  font-weight: 500;
  font-size: 0.9rem;
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
  transition: 0.3s ease-out;
`;
