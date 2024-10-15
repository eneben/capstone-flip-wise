import styled from "styled-components";
import { StyledFormHeadline } from "@/styledComponents";

export default function TemporaryFlashcardsModal({ temporaryFlashcards }) {
  console.log(temporaryFlashcards);
  return (
    <StyledOutgreyContainer>
      <StyledModal>
        <StyledFormHeadline>Generating Flashcards</StyledFormHeadline>
        {temporaryFlashcards.map((temporaryFlashcard) => {
          return (
            <div key={temporaryFlashcard.temporaryFlashcardId}>
              <p>{temporaryFlashcard.question}</p>
            </div>
          );
        })}
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
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  border-radius: 10px;
  background-color: #fff;
  opacity: 1;
  z-index: 2;
`;
