import styled from "styled-components";
import CorrectCounter from "../CorrectCounter/CorrectCounter";

export default function Footer({
  getIncorrectFlashcardsFromCollection,
  getCorrectFlashcardsFromCollection,
  id,
  flashcardSelection,
  changeFlashcardSelection,
}) {
  return (
    <StyledNavigation>
      <StyledList>
        <ListItem>
          <CorrectCounter
            active={flashcardSelection === "to-learn"}
            variant="incorrect"
            getIncorrectFlashcardsFromCollection={
              getIncorrectFlashcardsFromCollection
            }
            id={id}
            getCorrectFlashcardsFromCollection={
              getCorrectFlashcardsFromCollection
            }
            changeFlashcardSelection={changeFlashcardSelection}
          />
        </ListItem>
        <ListItem>
          <CorrectCounter
            active={flashcardSelection === "all"}
            variant="all"
            getIncorrectFlashcardsFromCollection={
              getIncorrectFlashcardsFromCollection
            }
            id={id}
            getCorrectFlashcardsFromCollection={
              getCorrectFlashcardsFromCollection
            }
            changeFlashcardSelection={changeFlashcardSelection}
          />
        </ListItem>
        <ListItem>
          <CorrectCounter
            active={flashcardSelection === "learned"}
            variant="correct"
            getIncorrectFlashcardsFromCollection={
              getIncorrectFlashcardsFromCollection
            }
            id={id}
            getCorrectFlashcardsFromCollection={
              getCorrectFlashcardsFromCollection
            }
            changeFlashcardSelection={changeFlashcardSelection}
          />
        </ListItem>
      </StyledList>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  width: 100vw;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-light-grey);
  box-shadow: 0 0 10px #000;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  max-width: 800px;
`;

const ListItem = styled.li`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $active }) => ($active ? "#e6e6e6" : "#fff")};
`;
