import FlashcardList from "@/components/FlashcardList/FlashcardList";
import FormCreateFlashcard from "@/components/FormCreateFlashcard/FormCreateFlashcard";
import flashcards from "@/assets/flashcards.json";
import collections from "@/assets/collections.json";

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

export default function HomePage() {
  return (
    <>
      <FormCreateFlashcard />
      <FlashcardList
        headline="Random Study Cards"
        flashcards={flashcardsWithCollection}
      />
    </>
  );
}
