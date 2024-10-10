import styled from "styled-components";
import Link from "next/link";

export default function HomePage() {
  return (
    <HomeWrapper>
      <StyledIntroduction>
        Welcome to BrainStack, your companion for mastering new skills and
        studying. Start stacking with knowledge today!
      </StyledIntroduction>
      <StyledModeSelection href="/learning" $color="green">
        <StyledModeName $color="green">Learning Mode</StyledModeName>
        <StyledDescription>
          Review unlearned flashcards, mark learned ones, and track progress by
          filtering unlearned, learned, or all cards.
        </StyledDescription>
      </StyledModeSelection>
      <StyledModeSelection href="/training" $color="blue">
        <StyledModeName $color="blue">Training Mode</StyledModeName>
        <StyledDescription>
          Cards move up or down five levels based on your answers. Focus more on
          what you don&apos;t know and reinforce knowledge efficiently.
        </StyledDescription>
      </StyledModeSelection>
      <StyledModeSelection href="/gaming" $color="red">
        <StyledModeName $color="red">Gaming Mode</StyledModeName>
        <StyledDescription>
          Learn in a playful way by sorting the front and back of the flashcard
          in a memory game. We think learning should be fun.
        </StyledDescription>
      </StyledModeSelection>
    </HomeWrapper>
  );
}

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
