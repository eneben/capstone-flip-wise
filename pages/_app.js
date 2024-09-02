import GlobalStyle from "../styles";
import Layout from "@/components/Layout/Layout";
import initialFlashcards from "@/assets/flashcards.json";
import collections from "@/assets/collections.json";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import { useState } from "react";
import ToastMessage from "@/components/ToastMessage/ToastMessage";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";

export default function App({ Component, pageProps }) {
  const [flashcards, setFlashcards] = useLocalStorageState("flashcards", {
    defaultValue: initialFlashcards,
  });

  const [toastMessage, setToastMessage] = useState(null);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);

  const [actionMode, setActionMode] = useState("default");

  function showToastMessage(message, variant, icon) {
    setToastMessage({ message, variant, icon });
    setTimeout(() => {
      setToastMessage(null);
    }, 5500);
  }

  function hideToastMessage() {
    setToastMessage(null);
  }

  function changeCurrentFlashcard(flashcard) {
    setCurrentFlashcard(flashcard);
  }

  function changeActionMode(mode) {
    setActionMode(mode);
  }

  function handleEditFlashcard(newFlashcard) {
    if (!currentFlashcard) {
      console.error("No flashcard selected for editing.");

      return;
    }
    const updatedFlashcard = {
      ...newFlashcard,
      id: currentFlashcard.id,
      isCorrect: currentFlashcard.isCorrect,
    };
    setFlashcards(
      flashcards.map((flashcard) => {
        return flashcard.id === updatedFlashcard.id
          ? updatedFlashcard
          : flashcard;
      })
    );
    changeActionMode("default");
    showToastMessage(
      "Flashcard updated successfully!",
      "success",
      MarkAsCorrect
    );
  }

  function handleCreateFlashcard(newFlashcard) {
    setFlashcards([
      {
        id: uid(),
        ...newFlashcard,
      },
      ...flashcards,
    ]);
    showToastMessage(
      "Flashcard created successfully!",
      "success",
      MarkAsCorrect
    );
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
    showToastMessage(
      "Flashcard deleted successfully!",
      "success",
      MarkAsCorrect
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
        handleDelete={handleDelete}
        currentFlashcard={currentFlashcard}
        changeCurrentFlashcard={changeCurrentFlashcard}
        actionMode={actionMode}
        changeActionMode={changeActionMode}
        handleEditFlashcard={handleEditFlashcard}
        handleCreateFlashcard={handleCreateFlashcard}
      />
      {toastMessage && (
        <ToastMessage
          text={toastMessage.message}
          variant={toastMessage.variant}
          icon={toastMessage.icon}
          onClick={hideToastMessage}
        />
      )}
    </Layout>
  );
}
