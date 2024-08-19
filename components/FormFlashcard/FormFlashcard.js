export default function FormFlashcard({ collections, onCreateFlashcard }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newFlashcard = Object.fromEntries(formData);

    onCreateFlashcard(newFlashcard);
    event.target.reset();
  }

  return (
    <>
      <h2>Create new flashcard</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question</label>
        <input id="question" name="question" type="text" required />
        <label htmlFor="answer">Answer</label>
        <input id="answer" name="answer" type="text" required />
        <label htmlFor="collection">Collection</label>
        <select id="collection" name="collection" required>
          {/* Wie machen wir das, dass die erste Option nicht auswählbar ist, wenn das select element required ist? Ist der leere value ausreichend? default value */}
          <option value="">--Please choose a collection:--</option>
          {collections.map((collection) => {
            return (
              <option key={collection.id} value={collection.title}>
                {collection.title}
              </option>
            );
          })}
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

// 5. layout
