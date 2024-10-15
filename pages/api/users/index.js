import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import User from "@/db/models/User";
import Flashcard from "@/db/models/Flashcard";

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

  if (request.method === "POST") {
    const providerId = session.user.id;

    try {
      const user = await User.findOne({ providerId });

      if (!user) {
        const createdUser = await User.create({ providerId });

        const defaultFlashcards = await Flashcard.find({ userId: null });
        const userFlashcards = defaultFlashcards.map((flashcard) => {
          return {
            userId: user._id,
            collectionId: flashcard.collectionId,
            question: flashcard.question,
            answer: flashcard.answer,
            level: 1,
            isCorrect: false,
          };
        });

        await Flashcard.insertMany(userFlashcards);
      }
      response.status(200).json({ user });
      return;
    } catch (error) {
      response
        .status(400)
        .json({ error: "Error during login process: " + error.message });
      return;
    }
  }
}
