import GlobalStyle from "../styles";
import Layout from "@/components/Layout/Layout";
import initialFlashcards from "@/assets/flashcards.json";
import collections from "@/assets/collections.json";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [flashcards, setFlashcards] = useLocalStorageState("flashcards", {
    defaultValue: initialFlashcards,
  });

  const [isEdit, setIsEdit] = useState(false);

  const [currentFlashcard, setCurrentFlashcard] = useState(null);

  function handleEditFlashcard(updatedFlashcard) {
    setFlashcards(
      flashcards.map((flashcard) => {
        return flashcard.id === updatedFlashcard.id
          ? updatedFlashcard
          : flashcard;
      })
    );
    setIsEdit(false);
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
    <Layout>
      <GlobalStyle />
      <Component
        {...pageProps}
        flashcardsWithCollection={flashcardsWithCollection}
        handleToggleCorrect={handleToggleCorrect}
        collections={collections}
        handleCreateFlashcard={handleCreateFlashcard}
        handleDelete={handleDelete}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        handleEditFlashcard={handleEditFlashcard}
        currentFlashcard={currentFlashcard}
        setCurrentFlashcard={setCurrentFlashcard}
      />
    </Layout>
  );
}
