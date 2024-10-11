import { useSession, signIn, signOut } from "next-auth/react";
import LoginIcon from "@/public/icons/LoginIcon.svg";
import LogoutIcon from "@/public/icons/LogoutIcon.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function Login({ position }) {
  const { data: session } = useSession();

  const [isSigning, setIsSigning] = useState("");

  console.log("Session data:", session);

  useEffect(() => {
    if (isSigning === "in") {
      handleSignIn();
    }

    function handleSignIn() {
      const signInTimeout = setTimeout(() => {
        signIn();
        setIsSigning("");
      }, 300);

      return () => {
        clearTimeout(signInTimeout);
      };
    }
  }, [isSigning]);

  useEffect(() => {
    if (isSigning === "out") {
      handleSignOut();
    }

    function handleSignOut() {
      const signOutTimeout = setTimeout(() => {
        signOut();
        setIsSigning("");
      }, 300);

      return () => {
        clearTimeout(signOutTimeout);
      };
    }
  }, [isSigning]);

  if (session) {
    return (
      <>
        <StyledButton $position={position} onClick={() => setIsSigning("out")}>
          <StyledWrapper>
            <StyledLogoutIcon $position={position} />
            {position === "menu" && <p>Logout</p>}
          </StyledWrapper>
        </StyledButton>
      </>
    );
  }

  return (
    <>
      <StyledButton $position={position} onClick={() => setIsSigning("in")}>
        <StyledWrapper>
          <StyledLoginIcon $position={position} />
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

const StyledLogoutIcon = styled(LogoutIcon)`
  width: ${({ $position }) => ($position === "header" ? "35px" : "30px")};
  height: ${({ $position }) => ($position === "header" ? "35px" : "30px")};
`;

const StyledLoginIcon = styled(LoginIcon)`
  width: ${({ $position }) => ($position === "header" ? "35px" : "30px")};
  height: ${({ $position }) => ($position === "header" ? "35px" : "30px")};
`;
