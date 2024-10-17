import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response
      .status(405)
      .json({ message: "Only POST requests are allowed" });
  }

  const {
    collectionId,
    collectionName,
    collectionColor,
    textInput,
    numberOfFlashcards,
  } = request.body;

  if (!textInput || !numberOfFlashcards) {
    return response
      .status(400)
      .json({ message: "Missing required parameters" });
  }

  try {
    const prompt = `
      Generate exactly ${numberOfFlashcards} flashcards from the following text. 
      Prioritize the information you include by importance. 
      Each flashcard should have a question and an answer. Here is the text:

      "${textInput}"

      Format the response as a JSON array of objects, each object containing 
      a "question" and an "answer". Do not include any additional information. 
      "Question" should not exceed a length of 100 characters (including spaces) and "answer" should not exceed a length of 50 characters (including spaces).
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 16384,
      temperature: 0.2,
    });

    const content = completion.choices[0].message.content
      .trim()
      .replace(/^```json|```$/g, "");

    const flashcards = JSON.parse(content);

    const flashcardsWithCollectionAndColor = flashcards.map((flashcard) => ({
      ...flashcard,
      collectionId,
      collectionName,
      collectionColor,
    }));

    response.status(200).json(flashcardsWithCollectionAndColor);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    response
      .status(500)
      .json({ message: "Error generating flashcards", error });
  }
}
