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
      const updatedFlashcard = request.body;
      if (!updatedFlashcard) {
        response.status(404).json({ status: "Not Found" });
        return;
      }
      await Flashcard.updateOne({ _id: id }, { $set: updatedFlashcard });
      response.status(200).json({ message: "Flashcard updated." });
    } catch (error) {
      response
        .status(400)
        .json({ error: "Error updating flashcard: " + error.message });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      await Flashcard.findByIdAndDelete(id);
      response.status(200).json({ message: "Flashcard deleted." });
      return;
    } catch (error) {
      response
        .status(400)
        .json({ error: "Error deleting flashcard: " + error.message });
      return;
    }
  }
}
