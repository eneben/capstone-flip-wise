import { useSession, signIn } from "next-auth/react";
import LoginIcon from "@/public/icons/LoginIcon.svg";
import LogoutIcon from "@/public/icons/LogoutIcon.svg";
import styled from "styled-components";
import { useEffect } from "react";

export default function Login({
  variant,
  changeShowLogOutDialog,
  additionalClick = () => {},
}) {
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchUser() {
      const user = await fetch(`/api/users/${session.user.id}`);

      // hier weiter GET request schreiben
      // wenn !response.ok, dann post request und neuen user erstellen

      const response = await fetch("/api/users", {
        method: "POST",
      });
      console.log("response: ", response);

      if (!response.ok) throw new Error("Failed to fetch user");
      const responseData = await response.json();
      console.log("responseData.user: ", responseData?.user);
      console.log("responseData._id: ", responseData?._id);
      const newUser = responseData._id;
    }
    if (session) {
      console.log("logged in! session: ", session);
      fetchUser();
    }
  }, [session]);

  if (session) {
    return (
      <>
        <StyledButton
          $variant={variant}
          onClick={() => {
            changeShowLogOutDialog(true);
            additionalClick();
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
          additionalClick();
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
