import styled from "styled-components";
import Link from "next/link";

export default function HomePage() {
  return (
    <HomeWrapper>
      <StyledIntroduction>
        Welcome to BrainStack, your companion for mastering new skills and
        studying. Start stacking with knowledge today!
      </StyledIntroduction>
      <StyledModeSelection href="/learning">
        <StyledModeName>Learning Mode</StyledModeName>
        <StyledDescription>
          Review unlearned flashcards, mark learned ones, and track progress by
          filtering unlearned, learned, or all cards.
        </StyledDescription>
      </StyledModeSelection>
      <StyledModeSelection href="/training">
        <StyledModeName>Training Mode</StyledModeName>
        <StyledDescription>
          Cards move up or down five levels based on your answers. Focus more on
          what you don&apos;t know and reinforce knowledge efficiently.
        </StyledDescription>
      </StyledModeSelection>
      <StyledModeSelection href="/gaming">
        <StyledModeName>Gaming Mode</StyledModeName>
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
  text-align: center;
  font: var(--question-answer);
`;

const StyledModeSelection = styled(Link)`
  padding: 20px;
  border-radius: 10px;
  border: var(--border-thickness) solid var(--primary-neutral);
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
  text-decoration: none;
  background-color: var(--secondary-light-grey);
`;

const StyledModeName = styled.h2`
  font: var(--collection-name);
  color: var(--primary-neutral);
`;

const StyledDescription = styled.p`
  font: var(--collection-title);
  color: var(--primary-neutral);
`;
