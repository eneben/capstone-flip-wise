export default function FormCreateFlashcard() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newFlashcard = Object.fromEntries(formData);
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
          <option value="">--Please choose a collection:--</option>
          {}
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
