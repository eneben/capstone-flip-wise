import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children, setIsEdit }) {
  const router = useRouter();

  return (
    <>
      <MainContainer>{children}</MainContainer>
      <nav>
        <StyledList>
          <ListItem $active={router.pathname === "/"}>
            <StyledLink onClick={() => setIsEdit(false)} href="/">
              Home
            </StyledLink>
          </ListItem>
          <ListItem $active={router.pathname === "/archive"}>
            <StyledLink onClick={() => setIsEdit(false)} href="/archive">
              Archive
            </StyledLink>
          </ListItem>
        </StyledList>
      </nav>
    </>
  );
}

const MainContainer = styled.main`
  margin: 0 auto;
  max-width: 30rem;
  padding: 0 1rem 4.5rem 1rem;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.5rem;
  z-index: 1;
  background-color: #fff;
`;

const ListItem = styled.li`
  width: 50%;
  height: 100%;
  text-align: center;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.$active ? "#e6e6e6" : "#fff")};

  &:nth-of-type(2) {
    border-left: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
