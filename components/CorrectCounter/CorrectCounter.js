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
  changeActionMode,
}) {
  const numberOfIncorrectFlashcards =
    getIncorrectFlashcardsFromCollection(id).length;
  const numberOfCorrectFlashcards =
    getCorrectFlashcardsFromCollection(id).length;
  const numberOfAllFlashcards =
    numberOfCorrectFlashcards + numberOfIncorrectFlashcards;

  const correctVariants = {
    incorrect: {
      icon: <MarkAsIncorrect />,
      count: numberOfIncorrectFlashcards,
      color: "#edafb8",
    },
    correct: {
      icon: <MarkAsCorrect />,
      count: numberOfCorrectFlashcards,
      color: "#b0c4b1",
    },
    all: {
      icon: <Stack />,
      count: numberOfAllFlashcards,
      color: "#eee",
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
    changeActionMode("default");
  }

  return (
    <CorrectCounterButton
      $active={active}
      onClick={handleRedirect}
      type="button"
    >
      <StyledIconWrapper $color={color}>{icon}</StyledIconWrapper>
      <span>{count}</span>
    </CorrectCounterButton>
  );
}

const CorrectCounterButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  background-color: ${({ $active }) => ($active ? "#e6e6e6" : "#fff")};
`;

const StyledIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $color }) => $color};
`;
