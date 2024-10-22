import dbConnect from "@/db/connect.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import Flashcard from "@/db/models/Flashcard.js";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (session) {
    console.log("ID: ", session.user.id);
  }

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

  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === "POST") {
    if (Array.isArray(request.body)) {
      try {
        const newFlashcards = request.body.map((flashcard) => {
          return {
            ...flashcard,
            level: 1,
            isCorrect: false,
          };
        });

        await Flashcard.insertMany(newFlashcards);
        response.status(201).json({ status: "Flashcards created" });
        return;
      } catch (error) {
        return response
          .status(400)
          .json({ error: "Error creating flashcards: " + error.message });
      }
    } else {
      try {
        const newFlashcard = request.body;
        console.log(newFlashcard);
        await Flashcard.create({ ...newFlashcard, level: 1, isCorrect: false });
        response.status(201).json({ status: "Flashcard created" });
        console.log("One of flashcard created");
        return;
      } catch (error) {
        return response
          .status(400)
          .json({ error: "Error creating flashcard: " + error.message });
      }
    }
  }
}
