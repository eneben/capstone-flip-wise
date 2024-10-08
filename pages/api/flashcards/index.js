import dbConnect from "@/db/connect.js";
import Flashcard from "@/db/models/Flashcard.js";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Database connection error: " + error.message });
  }

  if (request.method === "GET") {
    try {
      const flashcards = await Flashcard.find();
      response.status(200).json(flashcards);
      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error retrieving flashcards: " + error.message });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const newFlashcard = request.body;
      console.log("newFlashcard: ", newFlashcard);
      await Flashcard.create(newFlashcard);
      response.status(201).json({ status: "Flashcard created" });
      return;
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Error creating flashcard: " + error.message });
    }
  }
}

// if (request.method === "POST") {
//   try {
//     const flashcardData = request.body;
//     console.log("newFlashcard: ", newFlashcard);

//     const newFlashcard = new Flashcard(flashcardData);

//     await Flashcard.save();
//     response.status(201).json({ status: "Flashcard created" });
//     return;
//   } catch (error) {
//     return response
//       .status(400)
//       .json({ error: "Error creating flashcard: " + error.message });
//   }
// }
