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

  const { inputText, numberOfFlashcards } = request.body;

  if (!inputText || !numberOfFlashcards) {
    return response
      .status(400)
      .json({ message: "Missing required parameters" });
  }

  try {
    const prompt = `
      Generate ${numberOfFlashcards} flashcards from the following text. 
      Each flashcard should have a question and an answer. Here is the text:

      "${inputText}"

      Format the response as a JSON array of objects, each object containing 
      a "question" and an "answer". Do not include any additional information.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.2,
    });

    const flashcards = JSON.parse(completion.choices[0].message.content.trim());

    response.status(200).json(flashcards);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    response
      .status(500)
      .json({ message: "Error generating flashcards", error });
  }
}
