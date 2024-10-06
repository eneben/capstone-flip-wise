// Für das Abrufen aller Flashcards einer spezifischen Collection.

// Get by ID, PUT, DELETE

import dbConnect from "@/db/connect.js";
import Collection from "@/db/models/Collection.js";

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
      const collection = await Collection.findById(id);
      if (!collection) {
        response.status(404).json({ status: "Not Found" });
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

  //   if (request.method === "PATCH") {
  //     try {
  //       const updatedCollection = request.body;
  //       if (!updatedCollection) {
  //         response.status(404).json({ status: "Not Found" });
  //         return;
  //       }
  //       await Collection.updateOne({ _id: id }, { $set: updatedCollection });
  //       response.status(200).json({ message: "Collection updated." });
  //     } catch (error) {
  //       response
  //         .status(400)
  //         .json({ error: "Error updating collection: " + error.message });
  //       return;
  //     }
  //   }

  if (request.method === "DELETE") {
    try {
      await Collection.findByIdAndDelete(id);
      response.status(200).json({ message: "Collection deleted." });
      return;
    } catch (error) {
      response
        .status(400)
        .json({ error: "Error deleting collection: " + error.message });
      return;
    }
  }
}
