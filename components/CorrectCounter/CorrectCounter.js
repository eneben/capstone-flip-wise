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
  isFooter,
}) {
  const router = useRouter();

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
        isFooter={isFooter}
        content={icon}
        type="button"
        variant={variant}
        actionMode={actionMode}
      />
      <span>{count}</span>
    </CorrectCounterWrapper>
  );
}

const CorrectCounterWrapper = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
