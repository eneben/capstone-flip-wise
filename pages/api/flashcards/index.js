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
      const { userId } = request.query;
      let query = {};

      if (userId) {
        query = { userId: userId };
      } else {
        query = { userId: null };
      }

      const flashcards = await Flashcard.find(query);

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
      if (!session) {
        response.status(401).json({ status: "Not authorized" });
        return;
      }

      const newFlashcard = request.body;
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
