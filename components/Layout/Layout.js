import styled from "styled-components";

export default function Layout({ children }) {
  return <MainContainer>{children}</MainContainer>;
}

const MainContainer = styled.main`
  padding: 0 1rem 1rem 1rem;
`;
