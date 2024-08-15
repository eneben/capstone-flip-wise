import FlashcardList from "@/components/FlashcardList/FlashcardList";

export default function HomePage({
  flashcardsWithCollection,
  handleIsCorrect,
}) {
  return (
    <>
      <FlashcardList
        headline="Random Study Cards"
        flashcards={flashcardsWithCollection}
        handleIsCorrect={handleIsCorrect}
      />
    </>
  );
}
