import styled from "styled-components";

export default function Layout({ children }) {
  return <MainContainer>{children}</MainContainer>;
}

const MainContainer = styled.main`
  margin: 0 auto;
  max-width: 30rem;
  padding: 0 1rem 1rem 1rem;
`;
