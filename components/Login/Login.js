import { useSession, signIn, signOut } from "next-auth/react";
import LoginIcon from "@/public/icons/LoginIcon.svg";
import LogoutIcon from "@/public/icons/LogoutIcon.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";

export default function Login({ position }) {
  const { data: session } = useSession();

  // const [isSigning, setIsSigning] = useState("");
  const [showLogOutDialog, setShowLogOutDialog] = useState(false);

  console.log("Session data:", session);

  // useEffect(() => {
  //   if (isSigning === "in") {
  //     handleSignIn();
  //   }

  //   function handleSignIn() {
  //     const signInTimeout = setTimeout(() => {
  //       signIn();
  //       setIsSigning("");
  //     }, 300);

  //     return () => {
  //       clearTimeout(signInTimeout);
  //     };
  //   }
  // }, [isSigning]);

  // useEffect(() => {
  //   if (isSigning === "out") {
  //     handleSignOut();
  //   }

  //   function handleSignOut() {
  //     const signOutTimeout = setTimeout(() => {
  //       signOut();
  //       setIsSigning("");
  //     }, 300);

  //     return () => {
  //       clearTimeout(signOutTimeout);
  //     };
  //   }
  // }, [isSigning]);

  function toggleLogOutDialog() {
    setShowLogOutDialog(!showLogOutDialog);
  }

  function handleLogout() {
    signOut();
    toggleLogOutDialog();
  }

  if (session) {
    return (
      <>
        <StyledButton $position={position} onClick={() => toggleLogOutDialog()}>
          <StyledWrapper>
            <StyledLogoutIcon $position={position} />
            {position === "menu" && <p>Logout</p>}
          </StyledWrapper>
        </StyledButton>

        {showLogOutDialog && (
          <StyledOutgreyContainer>
            <ModalContainer>
              <ModalQuestion>Do you really want to log out?</ModalQuestion>
              <ButtonWrapper>
                <RegularButton
                  onClick={() => handleLogout()}
                  type="button"
                  variant="warning"
                >
                  Yes
                </RegularButton>
                <RegularButton
                  onClick={() => toggleLogOutDialog()}
                  type="button"
                  variant="confirm"
                >
                  No
                </RegularButton>
              </ButtonWrapper>
            </ModalContainer>
          </StyledOutgreyContainer>
        )}
      </>
    );
  }

  return (
    <>
      <StyledButton $position={position} onClick={() => signIn()}>
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

const StyledOutgreyContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: #00000088;
`;

const ModalContainer = styled.section`
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 10px;
  position: fixed;
  top: 190px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 90vw;
  height: 218px;
  max-width: 500px;
  z-index: 3;
`;

const ModalQuestion = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  padding: 50px 0 20px 0;
`;
