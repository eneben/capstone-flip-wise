import dbConnect from "@/db/connect.js";
import Collection from "@/db/models/Collection.js";
import Flashcard from "@/db/models/Flashcard";

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

  if (request.method === "DELETE") {
    try {
      await Flashcard.deleteMany({ collectionId: id });
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
