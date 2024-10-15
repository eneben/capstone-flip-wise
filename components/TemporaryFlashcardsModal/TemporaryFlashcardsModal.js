import styled from "styled-components";
import { StyledFormHeadline, StyledSubheading } from "@/styledComponents";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Switch from "react-switch";

export default function TemporaryFlashcardsModal({
  temporaryFlashcards,
  toggleTemporaryFlashcardIncluded,
}) {
  console.log(temporaryFlashcards);

  const collectionName = temporaryFlashcards[0].collectionName;

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
            <StyledFormHeadline>Preview</StyledFormHeadline>
            <StyledSubheading>
              Uncheck Ai generated flashcards you don't want to include in the{" "}
              <StyledCollectionName
                $collectionColor={temporaryFlashcards[0].collectionColor}
              >
                {collectionName}
              </StyledCollectionName>{" "}
              collection
            </StyledSubheading>

            <StyledTemporaryFlashcardsList>
              {temporaryFlashcards.map((temporaryFlashcard) => {
                return (
                  <StyledTemporaryFlashcardItem
                    $borderColor={temporaryFlashcard.collectionColor}
                    key={temporaryFlashcard.temporaryFlashcardId}
                  >
                    <StyledCheckboxWrapper>
                      <StyledCheckboxLabel htmlFor="flashcard-checkbox">
                        {temporaryFlashcard.isIncluded
                          ? "Included"
                          : "Not included"}
                      </StyledCheckboxLabel>
                      {/* <StyledCheckbox
                        id="flashcard-checkbox"
                        name="isIncluded"
                        type="checkbox"
                        value={temporaryFlashcard.temporaryFlashcardId}
                        onChange={() =>
                          onToggleIsIncludedInTemporaryFlashcard(
                            flashcard.temporaryFlashcardId
                          )
                        }
                        defaultChecked
                      /> */}

                      <Switch
                        id="flashcard-checkbox"
                        height={21}
                        width={42}
                        checked={temporaryFlashcard.isIncluded}
                        onChange={() =>
                          toggleTemporaryFlashcardIncluded(
                            temporaryFlashcard.temporaryFlashcardId
                          )
                        }
                      />
                    </StyledCheckboxWrapper>

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
  padding: 15px 20px 15px 20px;
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
  margin-top: 15px;
  padding: 15px;
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

const StyledCheckboxLabel = styled.label`
  font: var(--temporary-flashcard-preview-small-headline);
`;

const StyledCheckbox = styled.input`
  background-color: var(--primary-neutral);
  color: var(--primary-neutral);
`;

const StyledCheckboxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 8px;
`;

const StyledCollectionName = styled.span`
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: ${({ $collectionColor }) => $collectionColor};
`;
