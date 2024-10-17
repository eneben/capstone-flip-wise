import { useSession, signIn } from "next-auth/react";
import LoginIcon from "@/public/icons/LoginIcon.svg";
import LogoutIcon from "@/public/icons/LogoutIcon.svg";
import styled from "styled-components";
import { useEffect, useRef } from "react";

export default function Login({
  variant,
  changeShowLogOutDialog,
  additionalFunctions = () => {},
}) {
  const { data: session } = useSession();

  // const executedRef = useRef(false);

  useEffect(() => {
    async function fetchUser() {
      // if (executedRef.current) return;

      try {
        const response = await fetch(`/api/users/${session.user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const user = await response.json();
          console.log("found user: ", user);
          console.log("return user._id: ", user._id);
          // executedRef.current = true;
          return user._id;
        }

        if (response.status === 404) {
          console.log("no user");
          const createUserResponse = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              providerId: session.user.id,
            }),
          });
          console.log("createUserResponse: ", createUserResponse);

          if (!createUserResponse.ok) {
            throw new Error("Failed to create new user");
          }

          const createdUserData = await createUserResponse.json();
          console.log("createdUserData: ", createdUserData);
          console.log(
            "return createdUserData.user._id: ",
            createdUserData.user._id
          );
          // executedRef.current = true;
          return createdUserData.user._id;
        }
      } catch (error) {
        console.error("error during fetch user function: ", error);
        return;
      }
    }

    if (
      session
      // && !executedRef.current
    ) {
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
