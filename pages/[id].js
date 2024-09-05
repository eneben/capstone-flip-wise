import { useRouter } from "next/router";
import FlashcardList from "@/components/FlashcardList/FlashcardList";
import FormFlashcard from "@/components/FormFlashcard/FormFlashcard";
import styled from "styled-components";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import Link from "next/link";

export default function CollectionPage({
  handleToggleCorrect,
  collections,
  handleEditFlashcard,
  handleCreateFlashcard,
  handleDelete,
  actionMode,
  changeActionMode,
  currentFlashcard,
  changeCurrentFlashcard,
  getAllFlashcardsFromCollection,
  getIncorrectFlashcardsFromCollection,
  getCorrectFlashcardsFromCollection,
}) {
  const router = useRouter();
  const { id } = router.query;

  const [flashcardSelection, setFlashcardSelection] = useState("all");

  function changeFlashcardSelection(selection) {
    setFlashcardSelection(selection);
  }

  const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);
  const incorrectFlashcardsFromCollection =
    getIncorrectFlashcardsFromCollection(id);
  const correctFlashcardsFromCollection =
    getCorrectFlashcardsFromCollection(id);

  let displayedFlashcards;

  if (flashcardSelection === "all") {
    displayedFlashcards = allFlashcardsFromCollection;
  } else if (flashcardSelection === "learned") {
    displayedFlashcards = correctFlashcardsFromCollection;
  } else if (flashcardSelection === "to-learn") {
    displayedFlashcards = incorrectFlashcardsFromCollection;
  }

  const collectionTitle = displayedFlashcards?.[0]?.collectionTitle;
  const collectionColor = displayedFlashcards?.[0]?.collectionColor;

  return (
    <>
      <FormFlashcard
        collections={collections}
        headline={
          actionMode === "edit" ? "Edit Flashcard" : "Create new Flashcard"
        }
        actionMode={actionMode}
        changeActionMode={changeActionMode}
        currentFlashcard={currentFlashcard}
        onSubmitFlashcard={
          actionMode === "edit" ? handleEditFlashcard : handleCreateFlashcard
        }
      />

      <StyledLink href="/" onClick={() => changeActionMode("default")}>
        Back to collections list
      </StyledLink>

      {allFlashcardsFromCollection.length > 0 && (
        <FlashcardList
          handleDelete={handleDelete}
          headline={collectionTitle}
          subheading={
            (flashcardSelection === "all" && "All flashcards") ||
            (flashcardSelection === "learned" && "Learned flashcards") ||
            (flashcardSelection === "to-learn" && "Flashcards to learn")
          }
          flashcards={displayedFlashcards}
          handleToggleCorrect={handleToggleCorrect}
          changeCurrentFlashcard={changeCurrentFlashcard}
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          collectionColor={collectionColor}
        />
      )}
      {(!displayedFlashcards || displayedFlashcards.length === 0) && (
        <StyledMessage>
          {(flashcardSelection === "all" &&
            "No flashcards in this collection found. Add some new!") ||
            (flashcardSelection === "learned" &&
              "No learned flashcards in this collection. Start learning!") ||
            (flashcardSelection === "to-learn" &&
              "No unlearned flashcards in this collection. Add some new or review those you have already learned.")}
        </StyledMessage>
      )}
      <Footer
        allFlashcardsFromCollection={allFlashcardsFromCollection}
        getIncorrectFlashcardsFromCollection={
          getIncorrectFlashcardsFromCollection
        }
        getCorrectFlashcardsFromCollection={getCorrectFlashcardsFromCollection}
        id={id}
        actionMode={actionMode}
        changeActionMode={changeActionMode}
        flashcardSelection={flashcardSelection}
        changeFlashcardSelection={changeFlashcardSelection}
      />
    </>
  );
}

const StyledMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 40px 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 6px;
  background-color: #eee;
  display: block;
  margin: 10px;
  width: fit-content;
`;
