import { useSession, signIn, signOut } from "next-auth/react";
import LoginIcon from "@/public/icons/LoginIcon.svg";
import LogoutIcon from "@/public/icons/LogoutIcon.svg";
import styled from "styled-components";

export default function Login({ position }) {
  const { data: session } = useSession();

  console.log("Session data:", session);

  if (session) {
    return (
      <>
        <StyledButton $position={position} onClick={() => signOut()}>
          <StyledWrapper>
            <LogoutIcon />
            {position === "menu" && <p>Logout</p>}
          </StyledWrapper>
        </StyledButton>
      </>
    );
  }
  return (
    <>
      <StyledButton $position={position} onClick={() => signIn()}>
        <StyledWrapper>
          <LoginIcon />
          {position === "menu" && <p>Login</p>}
        </StyledWrapper>
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  color: #000;
  z-index: 1;
  background-color: transparent;
  border: none;
  color: ${({ $position }) => ($position === "header" ? "#000" : "#fff")};
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: 500;
`;
