import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import useSWR from "swr";
import Layout from "@/components/Layout/Layout";
import { uid } from "uid";
import { useEffect, useState } from "react";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import Info from "@/public/icons/Info.svg";
import ToastMessageContainer from "@/components/ToastMessage/ToastMessageContainer";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { color } from "framer-motion";

async function fetcher(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    console.error(`Request failed: ${response.status}`);
    if (i === retries - 1) {
      throw new Error(
        `Request with ${JSON.stringify(url)} failed after ${retries} retries.`
      );
    }
  }
}

export default function App({ Component, pageProps }) {
  const {
    data: flashcards,
    isLoading: flashcardIsLoading,
    error: flashcardError,
    mutate: mutateFlashcards,
  } = useSWR("/api/flashcards", fetcher, { fallbackData: [] });

  const {
    data: collections,
    isLoading: collectionIsLoading,
    error: collectionError,
    mutate: mutateCollections,
  } = useSWR("/api/collections", fetcher, { fallbackData: [] });

  if (flashcardError) {
    console.error("Flashcard fetch error:", flashcardError);
  }

  if (collectionError) {
    console.error("Collection fetch error:", collectionError);
  }

  const [toastMessages, setToastMessages] = useState([]);

  const [currentFlashcard, setCurrentFlashcard] = useState(null);

  const [currentCollection, setCurrentCollection] = useState(null);

  const [actionMode, setActionMode] = useState("default");

  const [flashcardSelection, setFlashcardSelection] = useState("all");

  const [isClickedFirstTime, setIsClickedFirstTime] = useState(false);

  function handleFirstClick() {
    if (!isClickedFirstTime) {
      setIsClickedFirstTime(true);
      showToastMessage(
        `Swipe right for correct, left for incorrect.`,
        "info",
        Info
      );
    }
  }

  function changeFlashcardSelection(selection) {
    setFlashcardSelection(selection);
  }

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

  if (
    !flashcards ||
    !collections ||
    flashcardIsLoading ||
    collectionIsLoading
  ) {
    return (
      <Layout>
        <GlobalStyle />
        <LoadingSpinner />
      </Layout>
    );
  }

  function changeCurrentFlashcard(flashcard) {
    setCurrentFlashcard(flashcard);
  }

  function changeCurrentCollection(collection) {
    setCurrentCollection(collection);
  }

  function changeActionMode(mode) {
    setActionMode(mode);
  }

  async function handleEditFlashcard(newFlashcard) {
    if (!currentFlashcard) {
      console.error("No flashcard selected for editing.");
      showToastMessage(
        "No flashcard selected for editing.",
        "error",
        MarkAsIncorrect
      );

      return;
    }
    const updatedFlashcard = {
      ...newFlashcard,
      _id: currentFlashcard._id,
      isCorrect: currentFlashcard.isCorrect,
      level: currentFlashcard.level,
    };

    await fetch(`/api/flashcards/${currentFlashcard._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFlashcard),
    });

    mutateFlashcards();
    changeActionMode("default");
    showToastMessage(
      "Flashcard updated successfully!",
      "success",
      MarkAsCorrect
    );
  }

  async function handleEditCollection(newCollection) {
    if (!currentCollection) {
      console.error("No collection selected for editing.");
      showToastMessage(
        "No collection selected for editing.",
        "error",
        MarkAsIncorrect
      );

      return;
    }
    const updatedCollection = {
      ...newCollection,
      title: currentCollection.title,
      color: currentCollection.color,
    };

    await fetch(`/api/collections/${currentCollection._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCollection),
    });

    mutateFlashcards();
    changeActionMode("default");
    showToastMessage(
      "Collection updated successfully!",
      "success",
      MarkAsCorrect
    );
  }

  async function handleCreateFlashcard(newFlashcard) {
    try {
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlashcard),
      });
      if (!response.ok) throw new Error("Failed to create flashcard");
      mutateFlashcards();
      setActionMode("default");
      showToastMessage(
        "Flashcard created successfully!",
        "success",
        MarkAsCorrect
      );
    } catch (error) {
      console.error("An error occurred: ", error);
      // showToastMessage("Error creating flashcard", "error", MarkAsIncorrect);
      showToastMessage("Error", "error", MarkAsIncorrect);
    }
  }

  async function handleToggleCorrect(id) {
    const flashcardToToggle = flashcards.find((flashcard) => {
      return flashcard._id === id;
    });

    const updatedFlashcard = {
      ...flashcardToToggle,
      isCorrect: !flashcardToToggle.isCorrect,
    };

    await fetch(`/api/flashcards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFlashcard),
    });

    mutateFlashcards();
  }

  async function handleDeleteFlashcard(id) {
    try {
      const response = await fetch(`/api/flashcards/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the flashcard.");
      }
      mutateFlashcards();
      showToastMessage(
        "Flashcard deleted successfully!",
        "success",
        MarkAsCorrect
      );
    } catch (error) {
      console.error("Error deleting flashcard: " + error.message);
      showToastMessage("Error deleting flashcard", "error", MarkAsIncorrect);
    }
  }

  async function handleDeleteCollection(id) {
    try {
      const collectionsResponse = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      });

      if (!collectionsResponse.ok) {
        throw new Error("Failed to delete the collection.");
      }

      mutateCollections();
      mutateFlashcards();
      showToastMessage(
        "Collection deleted successfully!",
        "success",
        MarkAsCorrect
      );
    } catch (error) {
      console.error("Error deleting collection: " + error.message);
      showToastMessage("Error deleting collection", "error", MarkAsIncorrect);
    }
  }

  async function handleAddCollection(newCollection) {
    try {
      const response = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCollection),
      });
      if (!response.ok) throw new Error("Failed to add collection");
      const responseData = await response.json();
      const newCollectionId = responseData._id;
      mutateCollections();
      showToastMessage(
        "Collection created successfully!",
        "success",
        MarkAsCorrect
      );
      return newCollectionId;
    } catch (error) {
      console.error("An error occurred: ", error);
      showToastMessage("An error occured.", "error", MarkAsIncorrect);
    }
  }

  function getCollection(collectionId) {
    const collectionToFind = collections.find((collection) => {
      return collection._id === collectionId;
    });
    return {
      title: collectionToFind?.title || "Unknown title",
      color: collectionToFind?.color || "#264653",
    };
  }

  const flashcardsWithCollection = flashcards.map((flashcard) => {
    const collection = getCollection(flashcard.collectionId);
    return {
      ...flashcard,
      collectionTitle: collection.title,
      collectionColor: collection.color,
    };
  });

  function getAllFlashcardsFromCollection(id) {
    const allFlashcardsFromCollection = flashcardsWithCollection.filter(
      (flashcard) => flashcard.collectionId === id
    );
    return allFlashcardsFromCollection;
  }

  function getCorrectFlashcardsFromCollection(id) {
    const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);
    const correctFlashcardsFromCollection = allFlashcardsFromCollection.filter(
      (flashcard) => flashcard.isCorrect === true
    );
    return correctFlashcardsFromCollection;
  }

  function getIncorrectFlashcardsFromCollection(id) {
    const allFlashcardsFromCollection = getAllFlashcardsFromCollection(id);
    const incorrectFlashcardsFromCollection =
      allFlashcardsFromCollection.filter((flashcard) => !flashcard.isCorrect);
    return incorrectFlashcardsFromCollection;
  }

  async function handleIncreaseFlashcardLevel(id) {
    const flashcard = flashcards.find((flashcard) => {
      return flashcard._id === id;
    });

    const updatedFlashcard = {
      ...flashcard,
      level: flashcard.level < 5 ? flashcard.level + 1 : flashcard.level,
      trainingDate: Date.now(),
    };

    await fetch(`/api/flashcards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFlashcard),
    });

    mutateFlashcards();
  }

  async function handleDecreaseFlashcardLevel(id) {
    const flashcard = flashcards.find((flashcard) => {
      return flashcard._id === id;
    });

    const updatedFlashcard = {
      ...flashcard,
      level: flashcard.level > 1 ? flashcard.level - 1 : flashcard.level,
      trainingDate: Date.now(),
    };

    await fetch(`/api/flashcards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFlashcard),
    });

    mutateFlashcards();
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <Layout
        collections={collections}
        actionMode={actionMode}
        changeActionMode={changeActionMode}
        currentFlashcard={currentFlashcard}
        handleEditFlashcard={handleEditFlashcard}
        handleCreateFlashcard={handleCreateFlashcard}
        changeFlashcardSelection={changeFlashcardSelection}
        handleAddCollection={handleAddCollection}
        getAllFlashcardsFromCollection={getAllFlashcardsFromCollection}
      >
        <GlobalStyle />
        <Component
          {...pageProps}
          flashcardsWithCollection={flashcardsWithCollection}
          handleToggleCorrect={handleToggleCorrect}
          collections={collections}
          handleDeleteFlashcard={handleDeleteFlashcard}
          handleDeleteCollection={handleDeleteCollection}
          currentFlashcard={currentFlashcard}
          changeCurrentFlashcard={changeCurrentFlashcard}
          actionMode={actionMode}
          changeActionMode={changeActionMode}
          handleEditFlashcard={handleEditFlashcard}
          handleCreateFlashcard={handleCreateFlashcard}
          getAllFlashcardsFromCollection={getAllFlashcardsFromCollection}
          getCorrectFlashcardsFromCollection={
            getCorrectFlashcardsFromCollection
          }
          getIncorrectFlashcardsFromCollection={
            getIncorrectFlashcardsFromCollection
          }
          flashcardSelection={flashcardSelection}
          changeFlashcardSelection={changeFlashcardSelection}
          handleIncreaseFlashcardLevel={handleIncreaseFlashcardLevel}
          handleDecreaseFlashcardLevel={handleDecreaseFlashcardLevel}
          handleFirstClick={handleFirstClick}
        />
        <ToastMessageContainer
          toastMessages={toastMessages}
          hideToastMessage={hideToastMessage}
        />
      </Layout>
    </SWRConfig>
  );
}
