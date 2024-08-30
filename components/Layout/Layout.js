import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo from "@/public/Logo_BrainStack.svg";
import Menu from "@/public/icons/Menu.svg";
import Plus from "@/public/icons/Plus.svg";
import RoundButton from "../Buttons/RoundButton";

export default function Layout({ children, collections, changeActionMode }) {
  const [isMenu, setIsMenu] = useState(true);

  const router = useRouter();

  return (
    <>
      <MainContainer>{children}</MainContainer>
      <StyledHeader>
        <Link href="/">
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </Link>

        <StyledButton
          type="button"
          name="menu"
          onClick={() => setIsMenu(!isMenu)}
        >
          <Menu />
        </StyledButton>

        <FormToggleContainer>
          <RoundButton
            type="button"
            content={<Plus />}
            variant="formToggle"
            name="menu"
            onClick
            disabled
            actionMode
          />
        </FormToggleContainer>
        {isMenu && (
          <StyledNavigation>
            <StyledNavigationList>
              <StyledNavigationListItem>Collections</StyledNavigationListItem>
            </StyledNavigationList>

            <StyledSubNavigationList>
              {collections.map((collection) => {
                return (
                  <StyledSubNavigationListItem key={collection.id}>
                    {collection.title}
                  </StyledSubNavigationListItem>
                );
              })}
            </StyledSubNavigationList>
          </StyledNavigation>
        )}
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

const StyledButton = styled.button`
  z-index: 2;
  background-color: #fff;
  border: none;
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

const StyledNavigation = styled.nav`
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
  font-weight: 500;
  text-align: center;
  color: #fff;
  background-color: #000;
`;

const StyledSubNavigationList = styled.ul`
  font-size: 0.8rem;
  list-style: none;
  line-height: 2.5;
`;

const StyledSubNavigationListItem = styled.li`
  border-top: 1px solid #000;
  text-align: center;

  &:nth-of-type(1) {
    border-top: 0;
  }
`;
