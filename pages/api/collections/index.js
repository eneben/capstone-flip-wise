// Für das Abrufen aller Collections

// GET & POST

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

  console.log("MongoDB connected");

  if (request.method === "GET") {
    try {
      const collections = await Collection.find();
      response.status(200).json(collections);

      console.log("Collections fetched:", collections);

      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error retrieving collections: " + error.message });

      console.log("Error fetching collections:", error);

      return;
    }
  }

  if (request.method === "POST") {
    try {
      const newCollection = request.body;
      await Collection.create(newCollection);
      response.status(201).json({ status: "Collection created" });
      return;
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Error creating collection: " + error.message });
    }
  }
}
