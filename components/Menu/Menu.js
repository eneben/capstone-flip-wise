import { useEffect, useState } from "react";
import MenuIcon from "@/public/icons/Menu.svg";
import SubMenuArrow from "@/public/icons/SubMenuArrow.svg";
import styled, { keyframes, css } from "styled-components";
import Link from "next/link";

export default function Menu({
  collections,
  startClosingForm,
  changeFlashcardSelection,
  getAllFlashcardsFromCollection,
}) {
  const [isMenu, setIsMenu] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isLearningCollections, setIsLearningCollections] = useState(false);
  const [isLearningCollectionsClosing, setIsLearningCollectionsClosing] =
    useState(false);
  const [isTrainingCollections, setIsTrainingCollections] = useState(false);
  const [isTrainingCollectionsClosing, setIsTrainingCollectionsClosing] =
    useState(false);
  const [isGamingCollections, setIsGamingCollections] = useState(false);
  const [isGamingCollectionsClosing, setIsGamingCollectionsClosing] =
    useState(false);

  function handleToggleMenu(event) {
    event.stopPropagation();
    if (!isMenu) {
      startClosingForm();
      setIsMenu(true);
    } else {
      setIsMenuClosing(true);
    }
    setIsLearningCollectionsClosing(true);
    setIsTrainingCollectionsClosing(true);
    setIsGamingCollectionsClosing(true);
  }

  useEffect(() => {
    if (isMenuClosing) {
      const menuTimeoutId = setTimeout(() => {
        setIsMenu(false);
        setIsMenuClosing(false);
      }, 390);
      return () => clearTimeout(menuTimeoutId);
    }
  }, [isMenuClosing]);

  function handleToggleLearningCollections(event) {
    event.stopPropagation();
    if (!isLearningCollections) {
      setIsLearningCollections(true);
      if (isTrainingCollections) {
        setIsTrainingCollectionsClosing(true);
      }
      if (isGamingCollections) {
        setIsGamingCollectionsClosing(true);
      }
    } else {
      setIsLearningCollectionsClosing(true);
    }
  }

  function handleToggleTrainingCollections(event) {
    event.stopPropagation();
    if (!isTrainingCollections) {
      setIsTrainingCollections(true);
      if (isLearningCollections) {
        setIsLearningCollectionsClosing(true);
      }
      if (isGamingCollections) {
        setIsGamingCollectionsClosing(true);
      }
    } else {
      setIsTrainingCollectionsClosing(true);
    }
  }

  function handleToggleGamingCollections(event) {
    event.stopPropagation();
    if (!isGamingCollections) {
      setIsGamingCollections(true);
      if (isLearningCollections) {
        setIsLearningCollectionsClosing(true);
      }
      if (isTrainingCollections) {
        setIsTrainingCollectionsClosing(true);
      }
    } else {
      setIsGamingCollectionsClosing(true);
    }
  }

  useEffect(() => {
    if (isLearningCollectionsClosing) {
      const collectionsTimeoutId = setTimeout(() => {
        setIsLearningCollections(false);
        setIsLearningCollectionsClosing(false);
      }, 290);
      return () => clearTimeout(collectionsTimeoutId);
    }
  }, [isLearningCollectionsClosing]);

  useEffect(() => {
    if (isTrainingCollectionsClosing) {
      const collectionsTimeoutId = setTimeout(() => {
        setIsTrainingCollections(false);
        setIsTrainingCollectionsClosing(false);
      }, 290);
      return () => clearTimeout(collectionsTimeoutId);
    }
  }, [isTrainingCollectionsClosing]);

  useEffect(() => {
    if (isGamingCollectionsClosing) {
      const collectionsTimeoutId = setTimeout(() => {
        setIsGamingCollections(false);
        setIsGamingCollectionsClosing(false);
      }, 290);
      return () => clearTimeout(collectionsTimeoutId);
    }
  }, [isGamingCollectionsClosing]);

  return (
    <StyledMenuContainer>
      <StyledButton type="button" name="menuButton" onClick={handleToggleMenu}>
        <MenuIcon />
      </StyledButton>

      {isMenu && <StyledOutsideClickArea onClick={handleToggleMenu} />}

      {isMenu && (
        <StyledNavigation id="menu" $isMenuClosing={isMenuClosing}>
          <StyledNavigationList>
            <StyledNavigationListItem>
              <StyledNavigationLink
                href="/"
                onClick={() => {
                  changeFlashcardSelection("all");
                  setIsMenuClosing(true);
                  setIsLearningCollectionsClosing(true);
                  setIsTrainingCollectionsClosing(true);
                }}
              >
                Home
              </StyledNavigationLink>
            </StyledNavigationListItem>

            <StyledNavigationListItem>
              <StyledNavigationLink
                href="/learning"
                onClick={() => {
                  changeFlashcardSelection("all");
                  setIsMenuClosing(true);
                  setIsLearningCollectionsClosing(true);
                }}
              >
                Learning Mode
              </StyledNavigationLink>
              <StyledSubMenuArrow
                $isRotate={isLearningCollections}
                onClick={handleToggleLearningCollections}
              />
            </StyledNavigationListItem>
            {isLearningCollections && (
              <StyledSubNavigationList>
                {collections.map((collection) => {
                  return (
                    <StyledSubNavigationListItem
                      key={collection._id}
                      $isCollectionsClosing={isLearningCollectionsClosing}
                    >
                      <StyledSubNavigationLink
                        href={`/learning/${collection._id}`}
                        onClick={() => {
                          changeFlashcardSelection("all");
                          setIsMenuClosing(true);
                          setIsLearningCollectionsClosing(true);
                        }}
                      >
                        {collection.title} (
                        {getAllFlashcardsFromCollection(collection._id).length})
                      </StyledSubNavigationLink>
                    </StyledSubNavigationListItem>
                  );
                })}
              </StyledSubNavigationList>
            )}

            <StyledNavigationListItem>
              <StyledNavigationLink
                href="/training"
                onClick={() => {
                  changeFlashcardSelection("all");
                  setIsMenuClosing(true);
                  setIsTrainingCollectionsClosing(true);
                }}
              >
                Training Mode
              </StyledNavigationLink>
              <StyledSubMenuArrow
                $isRotate={isTrainingCollections}
                onClick={handleToggleTrainingCollections}
              />
            </StyledNavigationListItem>
            {isTrainingCollections && (
              <StyledSubNavigationList>
                {collections.map((collection) => {
                  return (
                    <StyledSubNavigationListItem
                      key={collection._id}
                      $isCollectionsClosing={isTrainingCollectionsClosing}
                    >
                      <StyledSubNavigationLink
                        href={`/training/${collection._id}`}
                        onClick={() => {
                          changeFlashcardSelection("all");
                          setIsMenuClosing(true);
                          setIsTrainingCollectionsClosing(true);
                        }}
                      >
                        {collection.title} (
                        {getAllFlashcardsFromCollection(collection._id).length})
                      </StyledSubNavigationLink>
                    </StyledSubNavigationListItem>
                  );
                })}
              </StyledSubNavigationList>
            )}

            <StyledNavigationListItem>
              <StyledNavigationLink
                href="/gaming"
                onClick={() => {
                  changeFlashcardSelection("all");
                  setIsMenuClosing(true);
                  setIsGamingCollectionsClosing(true);
                }}
              >
                Gaming Mode
              </StyledNavigationLink>
              <StyledSubMenuArrow
                $isRotate={isGamingCollections}
                onClick={handleToggleGamingCollections}
              />
            </StyledNavigationListItem>
            {isGamingCollections && (
              <StyledSubNavigationList>
                {collections.map((collection) => {
                  return (
                    <StyledSubNavigationListItem
                      key={collection._id}
                      $isCollectionsClosing={isGamingCollectionsClosing}
                    >
                      <StyledSubNavigationLink
                        href={`/gaming/${collection._id}`}
                        onClick={() => {
                          changeFlashcardSelection("all");
                          setIsMenuClosing(true);
                          setIsGamingCollectionsClosing(true);
                        }}
                      >
                        {collection.title} (
                        {getAllFlashcardsFromCollection(collection._id).length})
                      </StyledSubNavigationLink>
                    </StyledSubNavigationListItem>
                  );
                })}
              </StyledSubNavigationList>
            )}
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
          ${menuAnimationOut} 0.4s ease-out
        `
      : css`
          ${menuAnimationIn} 0.4s ease-out
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

const StyledNavigationListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  color: #fff;
  background-color: #000;
  height: 44px;
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

const StyledOutsideClickArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0;
`;
