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
    When the text is too short to generate ${numberOfFlashcards} different flashcards, generate fewer but as many as possible.
    Each flashcard should have a question and an answer. Here is the text:
  
    "${textInput}"
  
    Ensure the output is formatted as valid JSON. 
    The response should be a JSON array of objects, where each object contains a "question" and an "answer".
    Ensure that:
    - "question" does not exceed 100 characters (including spaces).
    - "answer" does not exceed 50 characters (including spaces).
    - No additional information is included, and only valid JSON is returned.
  `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 16384,
      temperature: 0.2,
      response_format: { type: "json_object" },
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
