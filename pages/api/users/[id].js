import dbConnect from "@/db/connect.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import Collection from "@/db/models/Collection.js";
import Flashcard from "@/db/models/Flashcard";
import User from "@/db/models/User";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

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
      .json({ error: "No providerId provided in the request." });
  }

  if (request.method === "GET") {
    try {
      const user = await User.findOne({ providerId: id });

      if (!user) {
        response.status(404).json({ status: "User not Found" });
        return;
      }

      response.status(200).json(user);
      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error finding user: " + error.message });
      return;
    }
  }
}
