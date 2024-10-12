import dbConnect from "@/db/connect.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import Flashcard from "@/db/models/Flashcard.js";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  try {
    await dbConnect();
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Database connection error: " + error.message });
  }

  const { id } = request.query;

  if (!id) {
    return response
      .status(400)
      .json({ error: "No ID provided in the request." });
  }

  if (request.method === "GET") {
    try {
      const flashcard = await Flashcard.findById(id);
      if (!flashcard) {
        response.status(404).json({ status: "Not Found" });
        return;
      }
      response.status(200).json(flashcard);
      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error retrieving flashcard: " + error.message });
      return;
    }
  }

  if (request.method === "PATCH") {
    try {
      if (session) {
        const updatedFlashcard = request.body;
        if (!updatedFlashcard) {
          response.status(404).json({ status: "Not Found" });
          return;
        }
        await Flashcard.findByIdAndUpdate(id, updatedFlashcard);
        response.status(200).json({ message: "Flashcard updated." });
      } else {
        response.status(401).json({ status: "Not authorized" });
        return;
      }
    } catch (error) {
      response
        .status(400)
        .json({ error: "Error updating flashcard: " + error.message });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      if (session) {
        await Flashcard.findByIdAndDelete(id);
        response.status(200).json({ message: "Flashcard deleted." });
        return;
      } else {
        response.status(401).json({ status: "Not authorized" });
        return;
      }
    } catch (error) {
      response
        .status(400)
        .json({ error: "Error deleting flashcard: " + error.message });
      return;
    }
  }
}
