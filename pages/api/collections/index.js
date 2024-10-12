import dbConnect from "@/db/connect.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import Collection from "@/db/models/Collection.js";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  try {
    await dbConnect();
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Database connection error: " + error.message });
  }

  if (request.method === "GET") {
    try {
      const collections = await Collection.find();
      response.status(200).json(collections);
      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error retrieving collections: " + error.message });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      if (session) {
        const newCollection = request.body;
        const createdCollection = await Collection.create(newCollection);
        response.status(201).json(createdCollection);
        return;
      } else {
        response.status(401).json({ status: "Not authorized" });
        return;
      }
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Error creating collection: " + error.message });
    }
  }
}
