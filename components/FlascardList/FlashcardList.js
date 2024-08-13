import Flashcard from "../Flashcard/Flashcard";

export default function FlashcardList({ headline, flashcards }) {
  return (
    <>
      <h1>{headline}</h1>
      {flashcards.map((flashcard) => {
        return (
          <Flashcard
            key={flashcard.id}
            question={flashcard.question}
            answer={flashcard.answer}
            collection={flashcard.collectionTitle}
          />
        );
      })}
    </>
  );
}
