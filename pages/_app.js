import GlobalStyle from "../styles";
import Layout from "@/components/Layout/Layout";
import initialFlashcards from "@/assets/flashcards.json";
import collections from "@/assets/collections.json";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import { useState } from "react";

//TO DO:
// - neues State Management für Modes (default, create, edit, delete)
// - Components for input fields
// - dumme handleSubmit Funktion und if-else-Logik in
//  Elternkomponente (wie bei theme creator)

export default function App({ Component, pageProps }) {
  const [flashcards, setFlashcards] = useLocalStorageState("flashcards", {
    defaultValue: initialFlashcards,
  });

  const [currentFlashcard, setCurrentFlashcard] = useState(null);

  const [actionMode, setActionMode] = useState("default");

  function changeActionMode(mode) {
    setActionMode(mode);
  }

  function handleEditFlashcard(updatedFlashcard) {
    setFlashcards(
      flashcards.map((flashcard) => {
        return flashcard.id === updatedFlashcard.id
          ? updatedFlashcard
          : flashcard;
      })
    );
    changeActionMode("edit");
  }

  function handleCreateFlashcard(newFlashcard) {
    setFlashcards([
      {
        id: uid(),
        ...newFlashcard,
      },
      ...flashcards,
    ]);
  }

  function handleToggleCorrect(id) {
    setFlashcards(
      flashcards.map((flashcard) => {
        return flashcard.id === id
          ? { ...flashcard, isCorrect: !flashcard.isCorrect }
          : flashcard;
      })
    );
  }

  function handleDelete(id) {
    setFlashcards(
      flashcards.filter((flashcard) => {
        return flashcard.id !== id;
      })
    );
  }

  function getCollection(collectionId) {
    const collectionToFind = collections.find((collection) => {
      return collection.id === collectionId;
    });
    return collectionToFind.title;
  }

  const flashcardsWithCollection = flashcards.map((flashcard) => ({
    ...flashcard,
    collectionTitle: getCollection(flashcard.collectionId),
  }));

  return (
    <Layout changeActionMode={changeActionMode}>
      <GlobalStyle />
      <Component
        {...pageProps}
        flashcardsWithCollection={flashcardsWithCollection}
        handleToggleCorrect={handleToggleCorrect}
        collections={collections}
        handleCreateFlashcard={handleCreateFlashcard}
        handleDelete={handleDelete}
        handleEditFlashcard={handleEditFlashcard}
        currentFlashcard={currentFlashcard}
        setCurrentFlashcard={setCurrentFlashcard}
        actionMode={actionMode}
        changeActionMode={changeActionMode}
      />
    </Layout>
  );
}
