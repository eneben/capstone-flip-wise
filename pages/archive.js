import FlashcardList from "@/components/FlashcardList/FlashcardList";

export default function Archive({ flashcardsWithCollection, handleIsCorrect }) {
  const correctFlashcards = flashcardsWithCollection.filter(
    (flashcard) => flashcard.isCorrect === true
  );

  return (
    <>
      <FlashcardList
        headline="Archive"
        flashcards={correctFlashcards}
        handleIsCorrect={handleIsCorrect}
      />
    </>
  );
}
