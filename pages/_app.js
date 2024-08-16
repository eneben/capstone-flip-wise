import GlobalStyle from "../styles";
import Layout from "@/components/Layout/Layout";
import initialFlashcards from "@/assets/flashcards.json";
import collections from "@/assets/collections.json";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [flashcards, setFlashcards] = useLocalStorageState("flashcards", {
    defaultValue: initialFlashcards,
  });

  function handleCreateFlashcard(newFlashcard) {
    // 1. wir bekommen newFlashcard.collection und müssen die im collections-array finden,
    // um die id an flashcards weiterzugeben .
    setFlashcards([{ ...newFlashcard, id: uid() }, ...flashcards]);
  }

  function handleIsCorrect(id) {
    setFlashcards(
      flashcards.map((flashcard) => {
        return flashcard.id === id
          ? { ...flashcard, isCorrect: !flashcard.isCorrect }
          : flashcard;
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
        handleIsCorrect={handleIsCorrect}
        collections={collections}
      />
    </Layout>
  );
}
