import { useSession, signIn } from "next-auth/react";
import LoginIcon from "@/public/icons/LoginIcon.svg";
import LogoutIcon from "@/public/icons/LogoutIcon.svg";
import styled from "styled-components";

export default function Login({
  variant,
  changeShowLogOutDialog,
  onClick = () => {},
}) {
  const { data: session } = useSession();

  async function handleLogin() {
    try {
      await signIn();
      const response = await fetch("/api/users", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const responseData = await response.json();
      console.log("responseData.user: ", responseData?.user);
      console.log("responseData._id: ", responseData?._id);
      const user = responseData._id;
    } catch (error) {
      console.error("Login failed: ", error);
    }
  }

  if (session) {
    return (
      <>
        <StyledButton
          $variant={variant}
          onClick={() => {
            changeShowLogOutDialog(true);
            onClick();
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
          handleLogin();
          onClick();
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
