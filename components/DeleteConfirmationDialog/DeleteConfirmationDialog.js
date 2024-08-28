import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";

export default function DeleteConfirmationDialog({
  onDelete,
  resetActionMode,
  flashcardId,
}) {
  return (
    <>
      <ConfirmationQuestion>
        Do you want to delete this flashcard?
      </ConfirmationQuestion>
      <ButtonWrapper>
        <RegularButton
          content="Yes"
          onClick={() => onDelete(flashcardId)}
          type="button"
          variant="confirm"
        />
        <RegularButton
          content="No"
          onClick={resetActionMode}
          type="button"
          variant="warning"
        />
      </ButtonWrapper>
    </>
  );
}

const ConfirmationQuestion = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  padding-top: 37.2px;
  text-align: center;
`;
