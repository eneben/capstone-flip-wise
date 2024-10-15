import styled from "styled-components";
import { StyledFormHeadline, StyledSubheading } from "@/styledComponents";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function TemporaryFlashcardsModal({ temporaryFlashcards }) {
  console.log(temporaryFlashcards);
  return (
    <StyledOutgreyContainer>
      <StyledModal>
        {temporaryFlashcards.length === 0 && (
          <>
            <StyledFormHeadline>Please wait!</StyledFormHeadline>
            <StyledSubheading>
              Generating flashcards can take up to several minutes.
            </StyledSubheading>
            <LoadingSpinner />
          </>
        )}

        {temporaryFlashcards.length > 0 && (
          <>
            <StyledFormHeadline>Uncheck unwanted flashcards</StyledFormHeadline>
            <StyledTemporaryFlashcardsList>
              {temporaryFlashcards.map((temporaryFlashcard) => {
                return (
                  <StyledTemporaryFlashcardItem
                    $borderColor={temporaryFlashcard.collectionColor}
                    key={temporaryFlashcard.temporaryFlashcardId}
                  >
                    <StyledQuestionHeadline>Question:</StyledQuestionHeadline>
                    <StyledQuestionAnswer>
                      {" "}
                      {temporaryFlashcard.question}
                    </StyledQuestionAnswer>
                    <StyledAnswerHeadline>Answer:</StyledAnswerHeadline>
                    <StyledQuestionAnswer>
                      {temporaryFlashcard.answer}
                    </StyledQuestionAnswer>
                  </StyledTemporaryFlashcardItem>
                );
              })}
            </StyledTemporaryFlashcardsList>
          </>
        )}
      </StyledModal>
    </StyledOutgreyContainer>
  );
}

const StyledOutgreyContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: #00000088;
`;

const StyledModal = styled.article`
  position: absolute;
  width: 90vw;
  max-width: 500px;
  max-height: 90vh;
  padding: 15px;
  border-radius: 10px;
  background-color: #fff;
  opacity: 1;
  z-index: 2;
  overflow-y: scroll;
  scrollbar-width: 8px;
  scrollbar-color: var(--primary-neutral) #fff;
`;

const StyledTemporaryFlashcardsList = styled.ul`
  list-style: none;
`;

const StyledTemporaryFlashcardItem = styled.li`
  margin-top: 10px;
  padding: 10px;
  border: var(--border-thickness) solid ${({ $borderColor }) => $borderColor};
  border-radius: 10px;
`;

const StyledQuestionHeadline = styled.p`
  font: var(--temporary-flashcard-preview-small-headline);
`;

const StyledAnswerHeadline = styled.p`
  font: var(--temporary-flashcard-preview-small-headline);
  padding-top: 8px;
`;

const StyledQuestionAnswer = styled.p`
  font: var(--temporary-flashcard-preview-q-and-a);
`;
