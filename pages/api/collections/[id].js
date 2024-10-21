import dbConnect from "@/db/connect.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import Collection from "@/db/models/Collection.js";
import Flashcard from "@/db/models/Flashcard";

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
      const collection = await Collection.findById(id);
      if (!collection) {
        response.status(404).json({
          status: "Not Found",
          message:
            "This collection was not found, perhaps it has been deleted. Create a new one!",
        });
        return;
      }
      response.status(200).json(collection);
      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error retrieving collection: " + error.message });
      return;
    }
  }

  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === "DELETE") {
    const { userId } = request.body;

    try {
      await Flashcard.deleteMany({ collectionId: id, userId: userId });

      const flashcardsUsingOldCollection = await Flashcard.findOne({
        collectionId: id,
      });
      if (!flashcardsUsingOldCollection) {
        await Collection.findByIdAndDelete(id);
        response
          .status(200)
          .json({ message: "Collection and related flashcards deleted." });
      } else {
        response
          .status(200)
          .json({ message: "User's flashcards deleted. Collection retained." });
      }
      return;
    } catch (error) {
      response
        .status(400)
        .json({ error: "Error deleting collection: " + error.message });
      return;
    }
  }

  if (request.method === "PATCH") {
    try {
      const { newCollection, currentCollection } = request.body;
      const oldId = currentCollection._id;

      const updatedCollection = await Collection.create(newCollection);

      if (!updatedCollection) {
        return response.status(404).json({ error: "Collection not found" });
      }

      await Flashcard.updateMany(
        { collectionId: oldId },
        { collectionId: updatedCollection._id }
      );

      const flashcardsUsingOldCollection = await Flashcard.findOne({
        collectionId: oldId,
      });
      if (!flashcardsUsingOldCollection) {
        await Collection.findByIdAndDelete(oldId);
        response.status(200).json({
          message: "New collection created and unnecessary old one deleted.",
        });
      } else {
        response.status(200).json({
          message: "User's collection updated. Old collection retained.",
        });
      }

      response.status(200).json(updatedCollection);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Error updating collection: " + error.message });
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
}
