import styled from "styled-components";
import { useState } from "react";
import { StyledFormHeadline, StyledSubheading } from "@/styledComponents";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Switch from "react-switch";
import RegularButton from "../Buttons/RegularButton";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";

export default function TemporaryFlashcardsModal({
  temporaryFlashcards,
  toggleTemporaryFlashcardIncluded,
  handleDeleteTemporaryFlashcards,
  cancelFlashcardGeneration,
  onSubmitFlashcard,
  onAddCollection,
  onDeleteTemporaryFlashcards,
}) {
  const [isDelete, setIsDelete] = useState(false);

  function toggleDeleteConfirmation(event) {
    event.stopPropagation();
    setIsDelete((prevIsDelete) => !prevIsDelete);
  }

  async function handleSubmitAiFlashcards() {
    const includedFlashcards = temporaryFlashcards.filter(
      (temporaryFlashcard) => temporaryFlashcard.isIncluded
    );

    const newAiFlashcards = includedFlashcards.map(
      ({ question, answer, collectionId }) => {
        return { question, answer, collectionId };
      }
    );

    onSubmitFlashcard(newAiFlashcards);
    handleDeleteTemporaryFlashcards();
  }

  console.log(temporaryFlashcards);

  return (
    <StyledOutgreyContainer>
      <StyledModal>
        <StyledModalContentContainer $isTransparent={isDelete}>
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
                Uncheck AI-generated flashcards you don&apos;t want to include
                in the{" "}
                <StyledCollectionName
                  $collectionColor={temporaryFlashcards[0].collectionColor}
                >
                  {temporaryFlashcards[0].collectionName}
                </StyledCollectionName>{" "}
                collection.
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

                        <Switch
                          id={temporaryFlashcard.temporaryFlashcardId}
                          height={21}
                          width={42}
                          offColor="#e76f51"
                          onColor="#2a9d8f"
                          uncheckedIcon={false}
                          checkedIcon={false}
                          checked={temporaryFlashcard.isIncluded}
                          disabled={isDelete}
                          onChange={() =>
                            toggleTemporaryFlashcardIncluded(
                              temporaryFlashcard.temporaryFlashcardId
                            )
                          }
                        />
                      </StyledCheckboxWrapper>

                      <StyledContentContainer
                        $isTransparent={!temporaryFlashcard.isIncluded}
                      >
                        <StyledQuestionHeadline>
                          Question:
                        </StyledQuestionHeadline>
                        <StyledQuestionAnswer>
                          {" "}
                          {temporaryFlashcard.question}
                        </StyledQuestionAnswer>
                        <StyledAnswerHeadline>Answer:</StyledAnswerHeadline>
                        <StyledQuestionAnswer>
                          {temporaryFlashcard.answer}
                        </StyledQuestionAnswer>
                      </StyledContentContainer>
                    </StyledTemporaryFlashcardItem>
                  );
                })}
              </StyledTemporaryFlashcardsList>
            </>
          )}
        </StyledModalContentContainer>

        <StyledConfirmationContainer $morePaddingTop={isDelete}>
          {!isDelete && temporaryFlashcards.length > 0 && (
            <ButtonWrapper>
              <RegularButton
                type="button"
                variant="submit"
                onClick={() => handleSubmitAiFlashcards()}
              >
                Save
              </RegularButton>
              <RegularButton
                onClick={toggleDeleteConfirmation}
                type="button"
                variant="warning"
              >
                Cancel
              </RegularButton>
            </ButtonWrapper>
          )}

          {temporaryFlashcards.length === 0 && (
            <ButtonWrapper>
              <RegularButton
                onClick={cancelFlashcardGeneration}
                type="button"
                variant="warning"
              >
                Cancel
              </RegularButton>
            </ButtonWrapper>
          )}

          {isDelete && (
            <DeleteConfirmationDialogContainer>
              <div>
                <DeleteConfirmationDialog
                  onDeleteTemporaryFlashcards={handleDeleteTemporaryFlashcards}
                  toggleDeleteConfirmation={toggleDeleteConfirmation}
                  variant="preview collection and all flashcards in it"
                />
              </div>
            </DeleteConfirmationDialogContainer>
          )}
        </StyledConfirmationContainer>
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
  border-radius: 10px;
  background-color: #fff;
  opacity: 1;
  z-index: 2;
  overflow-y: scroll;
  scrollbar-width: 8px;
  scrollbar-color: var(--primary-neutral) #fff;
`;

const StyledModalContentContainer = styled.div`
  padding: 15px 20px 15px 20px;
  opacity: ${({ $isTransparent }) => ($isTransparent ? "0.5" : "1")};
`;

const DeleteConfirmationDialogContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #fff;
  z-index: 3;
`;

const StyledTemporaryFlashcardsList = styled.ul`
  list-style: none;
`;

const StyledTemporaryFlashcardItem = styled.li`
  margin-top: 15px;
  padding: 15px 15px 20px 15px;
  border: var(--border-thickness) solid ${({ $borderColor }) => $borderColor};
  border-radius: 10px;
`;

const StyledContentContainer = styled.div`
  opacity: ${({ $isTransparent }) => ($isTransparent ? 0.5 : 1)};
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

const StyledCheckboxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;
`;

const StyledCollectionName = styled.span`
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: ${({ $collectionColor }) => $collectionColor};
`;

const StyledConfirmationContainer = styled.div`
  padding: ${({ $morePaddingTop }) => ($morePaddingTop ? "20px" : "10px")} 20px
    20px 20px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0px 0px 10px #000;
`;
