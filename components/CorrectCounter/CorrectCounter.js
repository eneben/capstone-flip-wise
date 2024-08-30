import styled from "styled-components";
import RoundButton from "../Buttons/RoundButton";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";

export default function CorrectCounter({ variant, actionMode }) {
  if (variant !== "correct" && variant !== "incorrect") {
    return console.log("This variant doesn't exist.");
  }

  const correctVariants = {
    incorrect: {
      icon: <MarkAsIncorrect />,
      onClick: () => console.log("Incorrect button clicked"),
      count: 0,
      //Platzhalter für den count -> sollte dynamisch eingefügt werden
    },
    correct: {
      icon: <MarkAsCorrect />,
      onClick: () => console.log("Correct button clicked"),
      count: 0,
      //Platzhalter für den count -> sollte dynamisch eingefügt werden
    },
  };

  const { icon, onClick, count } = correctVariants[variant];

  return (
    <CorrectCounterWrapper>
      <RoundButton
        content={icon}
        onClick={onClick}
        type="button"
        variant={variant}
        actionMode={actionMode}
      />
      <Counter>{count}</Counter>
    </CorrectCounterWrapper>
  );
}

const CorrectCounterWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
`;

const Counter = styled.span``;
