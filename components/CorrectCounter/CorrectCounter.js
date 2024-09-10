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
      icon: <MarkAsIncorrect fill="#fff" />,
      count: numberOfIncorrectFlashcards,
      color: "#e76f51",
    },
    correct: {
      icon: <MarkAsCorrect fill="#fff" />,
      count: numberOfCorrectFlashcards,
      color: "#2a9d8f",
    },
    all: {
      icon: <Stack fill="#fff" />,
      count: numberOfAllFlashcards,
      color: "#264653",
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
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  background-color: ${({ $active }) => ($active ? "#e6e6e6" : "#fff")};
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
