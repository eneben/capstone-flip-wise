import styled from "styled-components";
import RoundButton from "../Buttons/RoundButton";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import Stack from "@/public/icons/Stack.svg";
import { useRouter } from "next/router";

export default function CorrectCounter({
  variant,
  actionMode,
  getIncorrectFlashcardsFromCollection,
  getCorrectFlashcardsFromCollection,
  id,
}) {
  const router = useRouter();

  if (variant !== "correct" && variant !== "incorrect" && variant !== "all") {
    return console.log("This variant doesn't exist.");
  }

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
    },
    correct: {
      icon: <MarkAsCorrect />,
      count: numberOfCorrectFlashcards,
    },
    all: {
      icon: <Stack />,
      count: numberOfAllFlashcards,
    },
  };

  const { icon, count } = correctVariants[variant];

  function handleRedirect() {
    if (variant === "correct") {
      router.push(`/${id}/learned`);
    } else if (variant === "incorrect") {
      router.push(`/${id}/to-learn`);
    } else if (variant === "all") {
      router.push(`/${id}`);
    }
  }

  return (
    <CorrectCounterWrapper onClick={handleRedirect}>
      <RoundButton
        content={icon}
        type="button"
        variant={variant}
        actionMode={actionMode}
      />
      <Counter>{count}</Counter>
    </CorrectCounterWrapper>
  );
}

const CorrectCounterWrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 10px;
`;

const Counter = styled.span``;
