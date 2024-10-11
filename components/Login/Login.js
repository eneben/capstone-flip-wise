import { useSession, signIn, signOut } from "next-auth/react";
import LoginIcon from "@/public/icons/LoginIcon.svg";
import LogoutIcon from "@/public/icons/LogoutIcon.svg";
import styled from "styled-components";

export default function Login() {
  const { data: session } = useSession();

  console.log("Session data:", session);

  if (session) {
    return (
      <>
        <StyledButton onClick={() => signOut()}>
          <LogoutIcon />
        </StyledButton>
      </>
    );
  }
  return (
    <>
      <StyledButton onClick={() => signIn()}>
        <LoginIcon />
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  color: #000;
  width: 35px;
  height: 35px;
  z-index: 1;
  background-color: #fff;
  border: none;
`;
