import styled from "styled-components";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <MainContainer>{children}</MainContainer>
      <NavigationWrapper>
        <NavigationList>
          <NavigationItem>Home</NavigationItem>
          <NavigationItem>Archive</NavigationItem>
        </NavigationList>
      </NavigationWrapper>
    </>
  );
}

const MainContainer = styled.main`
  margin: 0 auto;
  max-width: 30rem;
  padding: 0 1rem 1rem 1rem;
`;

const NavigationWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  height: 2.5rem;
  width: 100%;
  z-index: 1;
  background-color: #fff;
`;

const NavigationList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const NavigationItem = styled.li`
  padding: 10px;
  width: 50%;
  text-align: center;
  border: 1px solid #000;

  &:nth-of-type(2) {
    border-left: 0;
  }
`;
