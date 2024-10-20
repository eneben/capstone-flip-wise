import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  function SignedOutContainer({ isSignedOut, children }) {
    return isSignedOut ? (
      <StyledSignedOutContainer>{children}</StyledSignedOutContainer>
    ) : (
      <>{children}</>
    );
  }

  return (
    <HomeWrapper>
      {!session && (
        <StyledIntroduction>
          Welcome to BrainStack, your companion for mastering new skills and
          studying. To access training mode, gaming mode, and full flashcard
          management, please log in and start stacking with knowledge today!
        </StyledIntroduction>
      )}
      {session && (
        <StyledIntroduction>
          Welcome to BrainStack, your companion for mastering new skills and
          studying. Start stacking with knowledge today!
        </StyledIntroduction>
      )}

      <StyledModeSelection href="/learning" $color="green">
        <StyledModeName $color="green">Learning Mode</StyledModeName>
        <StyledDescription>
          Review unlearned flashcards, mark learned ones, and track progress by
          filtering unlearned, learned, or all cards.
        </StyledDescription>
      </StyledModeSelection>

      <SignedOutContainer isSignedOut={!session}>
        <StyledModeSelection href="/training" $color="blue">
          <StyledModeName $color="blue">Training Mode</StyledModeName>
          <StyledDescription>
            Cards move up or down five levels based on your answers. Focus more
            on what you don&apos;t know and reinforce knowledge efficiently.
          </StyledDescription>
        </StyledModeSelection>
        <StyledModeSelection href="/gaming" $color="red">
          <StyledModeName $color="red">Gaming Mode</StyledModeName>
          <StyledDescription>
            Learn in a playful way by sorting the front and back of the
            flashcard in a memory game. We think learning should be fun.
          </StyledDescription>
        </StyledModeSelection>
      </SignedOutContainer>
    </HomeWrapper>
  );
}

const StyledSignedOutContainer = styled.div`
  opacity: 0.4;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const HomeWrapper = styled.div`
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledIntroduction = styled.p`
  margin: 0 auto;
  max-width: 500px;
  text-align: center;
  font: var(--question-answer);
`;

const StyledModeSelection = styled(Link)`
  margin: 0 auto;
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  border: var(--border-thickness) solid
    ${({ $color }) =>
      $color === "green"
        ? "var(--primary-green)"
        : $color === "blue"
        ? "var(--primary-blue)"
        : "var(--primary-red)"};
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
  text-decoration: none;
  background-color: var(--secondary-light-grey);
`;

const StyledModeName = styled.h2`
  font: var(--collection-name);
  color: ${({ $color }) =>
    $color === "green"
      ? "var(--primary-green)"
      : $color === "blue"
      ? "var(--primary-blue)"
      : "var(--primary-red)"};
`;

const StyledDescription = styled.p`
  font: var(--collection-title);
  color: var(--primary-neutral);
`;
