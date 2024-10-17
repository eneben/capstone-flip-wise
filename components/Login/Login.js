import { useSession, signIn } from "next-auth/react";
import LoginIcon from "@/public/icons/LoginIcon.svg";
import LogoutIcon from "@/public/icons/LogoutIcon.svg";
import styled from "styled-components";

export default function Login({
  variant,
  changeShowLogOutDialog,
  additionalFunctions = () => {},
}) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <StyledButton
          $variant={variant}
          onClick={() => {
            changeShowLogOutDialog(true);
            additionalFunctions();
          }}
        >
          <StyledWrapper>
            <StyledLogoutIcon $variant={variant} />
            {variant === "expanded" && <p>Logout</p>}
          </StyledWrapper>
        </StyledButton>
      </>
    );
  }

  return (
    <>
      <StyledButton
        $variant={variant}
        onClick={() => {
          signIn();
          additionalFunctions();
        }}
      >
        <StyledWrapper>
          <StyledLoginIcon $variant={variant} />
          {variant === "expanded" && <p>Login</p>}
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
  color: ${({ $variant }) => ($variant === "icon" ? "#000" : "#fff")};
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
  width: ${({ $variant }) => ($variant === "icon" ? "35px" : "30px")};
  height: ${({ $variant }) => ($variant === "icon" ? "35px" : "30px")};
`;

const StyledLoginIcon = styled(LoginIcon)`
  width: ${({ $variant }) => ($variant === "icon" ? "35px" : "30px")};
  height: ${({ $variant }) => ($variant === "icon" ? "35px" : "30px")};
`;
