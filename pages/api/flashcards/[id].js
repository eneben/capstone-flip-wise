import dbConnect from "@/db/connect.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import Flashcard from "@/db/models/Flashcard.js";
import Collection from "@/components/Collection/Collection";

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

  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === "PATCH") {
    try {
      const updatedFlashcard = request.body;
      if (!updatedFlashcard) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      await Flashcard.findByIdAndUpdate(id, updatedFlashcard);
      response.status(200).json({ message: "Flashcard updated." });
    } catch (error) {
      response
        .status(400)
        .json({ error: "Error updating flashcard: " + error.message });
      return;
    }
  }

  // BEI DIESER FUNKTION WAR ICH VOR DEM UMBAU NOCH NICHT FERTIG,
  // DAHER DIE VIELEN CONSOLE.LOGS.
  // WEITER TESTEN!

  if (request.method === "DELETE") {
    try {
      const flashcardToDelete = await Flashcard.findById(id);
      if (!flashcardToDelete) {
        response.status(404).json({ error: "Flashcard not found." });
        return;
      }
      console.log("Flashcard to delete:", flashcardToDelete);

      const collectionId = flashcardToDelete.collectionId;
      console.log("collectionId:", collectionId);

      if (!collectionId) {
        response.status(400).json({ error: "Flashcard has no collectionId." });
        return;
      }

      await Flashcard.findByIdAndDelete(id);

      const flashcardsUsingOldCollection = await Flashcard.findOne({
        collectionId: collectionId,
      });
      console.log(
        "flashcardsUsingOldCollection:",
        flashcardsUsingOldCollection
      );

      if (!flashcardsUsingOldCollection) {
        console.log(
          "No more flashcards using this collection. Deleting collection:",
          collectionId
        );

        const collectionExists = await Collection.findById(collectionId);
        if (!collectionExists) {
          console.log("Collection does not exist, cannot delete.");
          response.status(404).json({ error: "Collection not found." });
          return;
        }

        const deletedCollection = await Collection.findByIdAndDelete(
          collectionId
        );
        console.log("Deleted collection:", deletedCollection);

        response
          .status(200)
          .json({ message: "Flashcards deleted, collection deleted." });
      } else {
        response
          .status(200)
          .json({ message: "Flashcard deleted. Collection retained." });
      }
      return;
    } catch (error) {
      response
        .status(400)
        .json({ error: "Error deleting flashcard: " + error.message });
      return;
    }
  }
}
