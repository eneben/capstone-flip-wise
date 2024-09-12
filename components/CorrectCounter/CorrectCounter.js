import styled from "styled-components";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import Stack from "@/public/icons/Stack.svg";

export default function CorrectCounter({
  variant,
  getIncorrectFlashcardsFromCollection,
  getCorrectFlashcardsFromCollection,
  id,
  changeFlashcardSelection,
  active,
}) {
  const numberOfIncorrectFlashcards =
    getIncorrectFlashcardsFromCollection(id).length;
  const numberOfCorrectFlashcards =
    getCorrectFlashcardsFromCollection(id).length;
  const numberOfAllFlashcards =
    numberOfCorrectFlashcards + numberOfIncorrectFlashcards;

  const correctVariants = {
    incorrect: {
      icon: <MarkAsIncorrect fill="#fff" />,
      count: numberOfIncorrectFlashcards,
      color: "var(--primary-red)",
    },
    correct: {
      icon: <MarkAsCorrect fill="#fff" />,
      count: numberOfCorrectFlashcards,
      color: "var(--primary-green)",
    },
    all: {
      icon: <Stack fill="#fff" />,
      count: numberOfAllFlashcards,
      color: "var(--primary-neutral)",
    },
  };

  const { icon, count, color } = correctVariants[variant];

  function handleRedirect() {
    if (variant === "correct") {
      changeFlashcardSelection("learned");
    } else if (variant === "incorrect") {
      changeFlashcardSelection("to-learn");
    } else if (variant === "all") {
      changeFlashcardSelection("all");
    }
  }

  return (
    <CorrectCounterButton
      $active={active}
      onClick={handleRedirect}
      type="button"
    >
      <StyledIconWrapper $color={color}>{icon}</StyledIconWrapper>
      <Counter>{count}</Counter>
    </CorrectCounterButton>
  );
}

const CorrectCounterButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  background-color: ${({ $active }) =>
    $active ? "var(--secondary-grey)" : "#fff"};
`;

const StyledIconWrapper = styled.div`
  width: 34px;
  height: 34px;
  padding: 7px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $color }) => $color};
`;

const Counter = styled.span`
  font: var(--counter);
`;
