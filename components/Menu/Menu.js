import { useState, useEffect } from "react";
import MenuIcon from "@/public/icons/Menu.svg";
import SubMenuArrow from "@/public/icons/SubMenuArrow.svg";
import styled, { keyframes, css } from "styled-components";
import Link from "next/link";

export default function Menu({ collections }) {
  const [isMenu, setIsMenu] = useState(false);
  const [isCollections, setIsCollections] = useState(false);

  useEffect(() => {
    if (isMenu) {
      document.addEventListener("click", clickOutsideMenu);
    }
    if (!isMenu) {
      document.removeEventListener("click", clickOutsideMenu);
    }
  }, [isMenu]);

  function clickOutsideMenu(event) {
    const menuArea = document.getElementById("menu");

    if (menuArea && !menuArea.contains(event.target)) {
      setIsMenu(false);
    }
  }

  function toggleMenu(event) {
    event.stopPropagation();
    setIsMenu(!isMenu);
    setIsCollections(false);
  }

  return (
    <>
      <StyledButton type="button" name="menuButton" onClick={toggleMenu}>
        <MenuIcon />
      </StyledButton>

      {isMenu && (
        <StyledNavigation id="menu" $isMenu={isMenu}>
          <StyledNavigationList>
            <StyledNavigationListItem>
              <StyledNavigationLink href="/">Collections</StyledNavigationLink>
              <StyledSubMenuArrow
                $isRotate={isCollections}
                onClick={() => setIsCollections(!isCollections)}
              />
            </StyledNavigationListItem>
            {isCollections && (
              <StyledSubNavigationList>
                {collections.map((collection) => {
                  return (
                    <StyledSubNavigationListItem
                      key={collection.id}
                      $iCollections={isCollections}
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
100% { right: 0px; }
0% { right: -220px; }
`;

const subMenuAnimation = keyframes`
0% { height: 0px; }
100% { height: 35px; }
`;

const StyledButton = styled.button`
  z-index: 1;
  background-color: #fff;
  border: none;
`;

const StyledNavigation = styled.nav`
  animation: ${(props) =>
    props.$isMenu
      ? css`
          ${menuAnimationOut} 0.3s ease-out
        `
      : css`
          ${menuAnimationIn} 0.3s ease-in
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
  animation-name: ${subMenuAnimation};
  animation-duration: 0.3s;
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
