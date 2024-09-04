import GlobalStyle from "../styles";
import Layout from "@/components/Layout/Layout";
import initialFlashcards from "@/assets/flashcards.json";
import collections from "@/assets/collections.json";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import { useEffect, useState } from "react";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import ToastMessageList from "@/components/ToastMessage/ToastMessageList";

export default function App({ Component, pageProps }) {
  const [flashcards, setFlashcards] = useLocalStorageState("flashcards", {
    defaultValue: initialFlashcards,
  });

  const [toastMessages, setToastMessages] = useState([]);

  const [currentFlashcard, setCurrentFlashcard] = useState(null);

  const [actionMode, setActionMode] = useState("default");

  function showToastMessage(message, variant, icon) {
    const id = uid();
    setToastMessages((allMessages) => [
      ...allMessages,
      { id, message, variant, icon },
    ]);
  }

  function hideToastMessage(id) {
    setToastMessages((allMessages) => {
      return allMessages.filter((message) => message.id !== id);
    });
  }

  useEffect(() => {
    if (toastMessages.length > 0) {
      const timers = toastMessages.map((message) =>
        setTimeout(() => hideToastMessage(message.id), 5500)
      );

      return () => {
        timers.forEach(clearTimeout);
      };
    }
  }, [toastMessages]);

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
      <ToastMessageList
        toastMessages={toastMessages}
        hideToastMessage={hideToastMessage}
      />
    </Layout>
  );
}
