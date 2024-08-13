export default function Flashcard({ question, answer, collection }) {
  return (
    <section>
      <p>{collection}</p>
      <p>{question}</p>
      <p>{answer}</p>
    </section>
  );
}
