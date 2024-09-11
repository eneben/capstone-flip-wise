import styled from "styled-components";
import { useRouter } from "next/router";
import CorrectCounter from "../CorrectCounter/CorrectCounter";

export default function Footer({
  getIncorrectFlashcardsFromCollection,
  getCorrectFlashcardsFromCollection,
  id,
  flashcardSelection,
  changeFlashcardSelection,
}) {
  const router = useRouter();

  return (
    <nav>
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
    </nav>
  );
}

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px #000;
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
