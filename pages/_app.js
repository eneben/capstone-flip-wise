import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout/Layout";
import styled from "styled-components";
// import initialFlashcards from "@/assets/flashcards.json";
// import initialCollections from "@/assets/collections.json";
// import useLocalStorageState from "use-local-storage-state";
import useSWR from "swr";
import { uid } from "uid";
import { useEffect, useState } from "react";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import Info from "@/public/icons/Info.svg";
import ToastMessageContainer from "@/components/ToastMessage/ToastMessageContainer";

export default function App({ Component, pageProps }) {
  // const [flashcards, setFlashcards] = useLocalStorageState("flashcards", {
  //   defaultValue: initialFlashcards,
  // });

  // const [collections, setCollections] = useLocalStorageState("collections", {
  //   defaultValue: initialCollections,
  // });

  const {
    data: flashcards,
    flashcardIsLoading,
    flashcardError,
  } = useSWR("/api/flashcards");
  const {
    data: collections,
    collectionIsLoading,
    collectionError,
  } = useSWR("/api/collections");

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
    // setFlashcards(
    //   flashcards.map((flashcard) => {
    //     return flashcard.id === updatedFlashcard.id
    //       ? updatedFlashcard
    //       : flashcard;
    //   })
    // );

    await fetch(`/api/flashcards/${currentFlashcard._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFlashcard),
    });

    if (isLoading || error) return <h2>Loading...</h2>;

    changeActionMode("default");
    showToastMessage(
      "Flashcard updated successfully!",
      "success",
      MarkAsCorrect
    );
  }

  async function handleCreateFlashcard(newFlashcard) {
    // setFlashcards([
    //   {
    //     id: uid(),
    //     ...newFlashcard,
    //   },
    //   ...flashcards,
    // ]);

    await fetch("api/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFlashcard),
    });
    if (isLoading || error) return <h2>Loading...</h2>;

    setActionMode("default");
    showToastMessage(
      "Flashcard created successfully!",
      "success",
      MarkAsCorrect
    );
  }

  // wie geht das hier bei der toggleCorrect-funktion?
  // ist ja auch ein crud-update.

  function handleToggleCorrect(id) {
    setFlashcards(
      flashcards.map((flashcard) => {
        return flashcard.id === id
          ? { ...flashcard, isCorrect: !flashcard.isCorrect }
          : flashcard;
      })
    );
  }

  async function handleDeleteFlashcard(id) {
    // setFlashcards(
    //   flashcards.filter((flashcard) => {
    //     return flashcard.id !== id;
    //   })
    // );
    try {
      const response = await fetch(`/api/flashcards/${_id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the flashcard.");
      }
    } catch (error) {
      console.error("Error deleting flashcard: " + error.message);
    }

    showToastMessage(
      "Flashcard deleted successfully!",
      "success",
      MarkAsCorrect
    );
  }

  async function handleDeleteCollection(id) {
    // setCollections(
    //   collections.filter((collection) => {
    //     return collection.id !== id;
    //   })
    // );

    try {
      const response = await fetch(`/api/collections/${_id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the collection.");
      }
    } catch (error) {
      console.error("Error deleting collection: " + error.message);
    }

    // setFlashcards(
    //   flashcards.filter((flashcard) => {
    //     return flashcard.collectionId !== id;
    //   })
    // );

    // wie mache ich die flashcard-delete-funktion nicht anhand der id sondern anhand der collectionId?

    showToastMessage(
      "Collection deleted successfully!",
      "success",
      MarkAsCorrect
    );
  }

  // BIS HIER, NOCH NICHT WEITER GEGUCKT!!!

  function handleAddCollection(newCollection) {
    setCollections([newCollection, ...collections]);
  }

  function getCollection(collectionId) {
    const collectionToFind = collections.find((collection) => {
      return collection.id === collectionId;
    });
    return {
      title: collectionToFind.title,
      color: collectionToFind.color,
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

  function handleIncreaseFlashcardLevel(id) {
    setFlashcards(
      flashcards.map((flashcard) => {
        if (flashcard.id === id) {
          return flashcard.level < 5
            ? {
                ...flashcard,
                level: flashcard.level + 1,
                trainingDate: Date.now(),
              }
            : {
                ...flashcard,
                trainingDate: Date.now(),
              };
        }
        return flashcard;
      })
    );
  }

  function handleDecreaseFlashcardLevel(id) {
    setFlashcards(
      flashcards.map((flashcard) => {
        if (flashcard.id === id) {
          return flashcard.level > 1
            ? {
                ...flashcard,
                level: flashcard.level - 1,
                trainingDate: Date.now(),
              }
            : {
                ...flashcard,
                trainingDate: Date.now(),
              };
        }
        return flashcard;
      })
    );
  }

  if (!flashcards || !collections) {
    return <p>Loading...</p>;
  }

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

const BackgroundColor = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  max-width: 800px;
  background-color: #fff;
`;
