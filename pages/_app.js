import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout/Layout";
import useSWR from "swr";
import { uid } from "uid";
import { useEffect, useState } from "react";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import Info from "@/public/icons/Info.svg";
import ToastMessageContainer from "@/components/ToastMessage/ToastMessageContainer";

export default function App({ Component, pageProps }) {
  console.log("App rendered");

  const {
    data: flashcards,
    isLoading: flashcardIsLoading,
    error: flashcardError,
    mutate: mutateFlashcards,
  } = useSWR("/api/flashcards");

  const {
    data: collections,
    isLoading: collectionIsLoading,
    error: collectionError,
    mutate: mutateCollections,
  } = useSWR("/api/collections");

  console.log("collections: ", collections);

  const [toastMessages, setToastMessages] = useState([]);

  const [currentFlashcard, setCurrentFlashcard] = useState(null);

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

  function changeCurrentFlashcard(flashcard) {
    setCurrentFlashcard(flashcard);
  }

  function changeActionMode(mode) {
    setActionMode(mode);
  }

  async function handleEditFlashcard(newFlashcard) {
    if (!currentFlashcard) {
      console.error("No flashcard selected for editing.");
      return;
    }
    const updatedFlashcard = {
      ...newFlashcard,
      _id: currentFlashcard._id,
      isCorrect: currentFlashcard.isCorrect,
    };

    await fetch(`/api/flashcards/${currentFlashcard._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFlashcard),
    });

    if (flashcardIsLoading || flashcardError) return <h2>Loading...</h2>;
    mutateFlashcards();
    changeActionMode("default");
    showToastMessage(
      "Flashcard updated successfully!",
      "success",
      MarkAsCorrect
    );
  }

  console.log("weiter unten in der app.js");

  async function handleCreateFlashcard(newFlashcard) {
    try {
      const response = await fetch("api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlashcard),
      });
      if (!response.ok) throw new Error("Failed to create flashcard");
      if (flashcardIsLoading || flashcardError) return <h2>Loading...</h2>;
      mutateFlashcards();
      setActionMode("default");
      showToastMessage(
        "Flashcard created successfully!",
        "success",
        MarkAsCorrect
      );
    } catch (error) {
      console.error("An error occurred: ", error);
      // showToastMessage(
      //   "Error creating flashcard",
      //   "error",
      //   Warning-Icon
      // );
    }
  }

  console.log("unter handleCreateFlashcard");

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

  console.log("unter handleToggleCorrect");

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
    }
  }
  console.log("unter handleDeleteFlashcard");

  async function handleDeleteCollection(id) {
    try {
      const collectionsResponse = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      });
      if (!collectionsResponse.ok) {
        throw new Error("Failed to delete the collection.");
      }

      const flashcardsResponse = await fetch(
        `/api/flashcards?collectionId=${id}`,
        {
          method: "DELETE",
        }
      );
      if (!flashcardsResponse.ok) {
        throw new Error("Failed to delete the flashcard.");
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
    }
  }

  console.log("unter handleDeleteCollection");

  async function handleAddCollection(newCollection) {
    try {
      const response = await fetch("api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCollection),
      });
      if (!response.ok) throw new Error("Failed to add collection");
      if (collectionIsLoading || collectionError) return <h2>Loading...</h2>;
      mutateCollections();
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  }

  function getCollection(collectionId) {
    const collectionToFind = collections.find((collection) => {
      return collection._id === collectionId;
    });
    return {
      title: collectionToFind.title,
      color: collectionToFind.color,
    };
  }

  console.log("unter handleAddCollection");

  const flashcardsWithCollection = (flashcards || []).map((flashcard) => {
    const collection = getCollection(flashcard.collectionId);
    return {
      ...flashcard,
      collectionTitle: collection?.title || "Unknown Collection",
      collectionColor: collection?.color || "#bec7cb",
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

  console.log("über dem early return");

  if (!flashcards || !collections) {
    return <p>Loading...</p>;
  }

  console.log("über dem normalen return");

  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
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
