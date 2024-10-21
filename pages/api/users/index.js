import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import User from "@/db/models/User";
import Flashcard from "@/db/models/Flashcard";
import Collection from "@/db/models/Collection";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  try {
    await dbConnect();
  } catch (error) {
    console.error("Database connection error:", error);
    return response
      .status(500)
      .json({ error: "Database connection error: " + error.message });
  }

  const providerId = session.user.id;

  try {
    const user = await User.findOneAndUpdate(
      { providerId },
      { $setOnInsert: { providerId } },
      {
        new: true,
        upsert: true,
      }
    );

    const collectionsExist = await Collection.exists({
      userId: user._id,
    });

    if (!collectionsExist) {
      const defaultCollections = await Collection.find({ userId: null });

      const userCollections = defaultCollections.map((collection) => ({
        userId: user._id,
        title: collection.title,
        color: collection.color,
      }));

      const checkAndCreateFlashcards = userFlashcards.map((flashcard) => ({
        updateOne: {
          filter: { userId: flashcard.userId, question: flashcard.question },
          update: { $setOnInsert: flashcard },
          upsert: true,
        },
      }));

      await Flashcard.bulkWrite(checkAndCreateFlashcards);

      const defaultFlashcards = await Flashcard.find({ userId: null });

      const userFlashcards = defaultFlashcards.map((flashcard) => ({
        userId: user._id,
        collectionId: flashcard.collectionId,
        question: flashcard.question,
        answer: flashcard.answer,
        level: 1,
        isCorrect: false,
      }));

      const checkAndCreateFlashcards = userFlashcards.map((flashcard) => ({
        updateOne: {
          filter: { userId: flashcard.userId, question: flashcard.question },
          update: { $setOnInsert: flashcard },
          upsert: true,
        },
      }));

      await Flashcard.bulkWrite(checkAndCreateFlashcards);
    }

    return response.status(200).json({ user });
  } catch (error) {
    console.error("Error in handler:", error);

    if (error.code === 11000) {
      return response
        .status(409)
        .json({ error: "Duplicate flashcard detected" });
    }

    return response
      .status(400)
      .json({ error: "Error during login process: " + error.message });
  }
}
