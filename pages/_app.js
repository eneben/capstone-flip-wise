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

  const [temporaryFlashcards, setTemporaryFlashcards] = useState([]);

  async function getAiFlashcards(
    collectionId,
    collectionName,
    collectionColor,
    textInput,
    numberOfFlashcards
  ) {
    try {
      const response = await fetch("/api/ai-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionId,
          collectionName,
          collectionColor,
          textInput,
          numberOfFlashcards,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setTemporaryFlashcards(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
      ...currentCollection,
      title: newCollection.title,
      color: newCollection.color,
    };

    try {
      const response = await fetch(
        `/api/collections/${currentCollection._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCollection),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update collection");
      }

      mutateCollections();
      showToastMessage(
        "Collection updated successfully!",
        "success",
        MarkAsCorrect
      );
    } catch (error) {
      console.error("Error updating collection:", error);
      showToastMessage("Error updating collection.", "error", MarkAsIncorrect);
    }
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
      showToastMessage(
        "Flashcard created successfully!",
        "success",
        MarkAsCorrect
      );
    } catch (error) {
      console.error("An error occurred: ", error);
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
        getAiFlashcards={getAiFlashcards}
        collections={collections}
        actionMode={actionMode}
        changeActionMode={changeActionMode}
        currentFlashcard={currentFlashcard}
        currentCollection={currentCollection}
        handleEditFlashcard={handleEditFlashcard}
        handleCreateFlashcard={handleCreateFlashcard}
        changeFlashcardSelection={changeFlashcardSelection}
        handleAddCollection={handleAddCollection}
        handleEditCollection={handleEditCollection}
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
          handleEditCollection={handleEditCollection}
          currentFlashcard={currentFlashcard}
          currentCollection={currentCollection}
          changeCurrentCollection={changeCurrentCollection}
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
