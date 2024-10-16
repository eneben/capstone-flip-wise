import styled from "styled-components";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import RoundButton from "../Buttons/RoundButton";

export default function AiInfoModal({ changeShowInfoModal }) {
  return (
    <StyledOutgreyContainer onClick={() => changeShowInfoModal(false)}>
      <StyledModal>
        <StyledCloseButtonContainer>
          <RoundButton
            onClick={() => changeShowInfoModal(false)}
            type="button"
            variant="edit"
          >
            <MarkAsIncorrect />
          </RoundButton>
        </StyledCloseButtonContainer>
        <StyledList>
          <StyledListItem>
            <StyledInfoListHighlight>Copy and paste </StyledInfoListHighlight>
            the text from which you want to generate the flashcards into the{" "}
            <StyledInfoListHighlight>Text input</StyledInfoListHighlight> field.
          </StyledListItem>
          <StyledListItem>
            Select the{" "}
            <StyledInfoListHighlight>
              number of flashcards
            </StyledInfoListHighlight>{" "}
            you want to generate from the text.
          </StyledListItem>
          <StyledListItem>
            Choose a{" "}
            <StyledInfoListHighlight>higher number</StyledInfoListHighlight> if
            you want to learn the information from the text{" "}
            <StyledInfoListHighlight>more thoroughly</StyledInfoListHighlight>{" "}
            or a <StyledInfoListHighlight>lower number</StyledInfoListHighlight>{" "}
            to learn only{" "}
            <StyledInfoListHighlight>
              more important facts
            </StyledInfoListHighlight>
            .
          </StyledListItem>
          <StyledListItem>
            <StyledInfoListHighlight>
              Select an already existing collection
            </StyledInfoListHighlight>{" "}
            from the dropdown to add your flashcards to or{" "}
            <StyledInfoListHighlight>create a new one</StyledInfoListHighlight>.
          </StyledListItem>
          <StyledListItem>
            Let the{" "}
            <StyledInfoListHighlight>AI do their magic</StyledInfoListHighlight>{" "}
            and{" "}
            <StyledInfoListHighlight>
              generate flashcards
            </StyledInfoListHighlight>{" "}
            in no time.
          </StyledListItem>
          <StyledListItem>
            <StyledInfoListHighlight>
              Uncheck flashcards
            </StyledInfoListHighlight>{" "}
            you don't want to include in your collection.
          </StyledListItem>
          <StyledListItem>
            <StyledInfoListHighlight>
              Save the flashcards
            </StyledInfoListHighlight>{" "}
            to your collection.
          </StyledListItem>
        </StyledList>
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
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #fff;
  opacity: 1;
  z-index: 2;
`;

const StyledList = styled.ol`
  padding-left: 15px;
`;

const StyledListItem = styled.li`
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid #000;
  &::marker {
    font-weight: bold;
  }
  &:nth-last-of-type(1) {
    border-bottom: none;
  }
`;

const StyledInfoListHighlight = styled.span`
  font-weight: 600;
`;

const StyledCloseButtonContainer = styled.div`
  padding-bottom: 10px;
  display: flex;
  justify-content: end;
`;
