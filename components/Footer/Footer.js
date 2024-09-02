import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import CorrectCounter from "../CorrectCounter/CorrectCounter";
import Stack from "@/public/icons/Stack.svg";
import RoundButton from "../Buttons/RoundButton";

export default function Footer({
  allFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  getCorrectFlashcardsFromCollection,
  id,
  actionMode,
  changeActionMode,
}) {
  const router = useRouter();

  return (
    <nav>
      <StyledList>
        <ListItem
          onClick={() => changeActionMode("default")}
          $active={router.pathname.endsWith("/to-learn")}
        >
          <CorrectCounter
            variant="incorrect"
            getIncorrectFlashcardsFromCollection={
              getIncorrectFlashcardsFromCollection
            }
            id={id}
            getCorrectFlashcardsFromCollection={
              getCorrectFlashcardsFromCollection
            }
            actionMode={actionMode}
          />
        </ListItem>
        <ListItem
          onClick={() => changeActionMode("default")}
          $active={router.pathname.endsWith("/[id]")}
        >
          <CorrectCounter
            variant="all"
            getIncorrectFlashcardsFromCollection={
              getIncorrectFlashcardsFromCollection
            }
            id={id}
            getCorrectFlashcardsFromCollection={
              getCorrectFlashcardsFromCollection
            }
            actionMode={actionMode}
          />
        </ListItem>
        <ListItem
          onClick={() => changeActionMode("default")}
          $active={router.pathname.endsWith("/learned")}
        >
          <CorrectCounter
            variant="correct"
            getIncorrectFlashcardsFromCollection={
              getIncorrectFlashcardsFromCollection
            }
            id={id}
            getCorrectFlashcardsFromCollection={
              getCorrectFlashcardsFromCollection
            }
            actionMode={actionMode}
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
  height: 4rem;
  z-index: 1;
  background-color: #fff;
`;

const ListItem = styled.li`
  width: 33.33%;
  height: 100%;
  text-align: center;
  border: 1px solid #000;
  border-left: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.$active ? "#e6e6e6" : "#fff")};

  &:nth-of-type(3) {
    border-right: none;
  }
`;
