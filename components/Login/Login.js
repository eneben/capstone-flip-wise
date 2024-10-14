import { useSession, signIn } from "next-auth/react";
import LoginIcon from "@/public/icons/LoginIcon.svg";
import LogoutIcon from "@/public/icons/LogoutIcon.svg";
import styled from "styled-components";

export default function Login({ position, changeShowLogOutDialog }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <StyledButton
          $position={position}
          onClick={() => changeShowLogOutDialog(true)}
        >
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
