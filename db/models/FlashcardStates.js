import mongoose from "mongoose";
import "./Collection";
import User from "./User";
import Flashcard from "./Flashcard";

const { Schema } = mongoose;

const flashcardStatesSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  flashcardId: { type: Schema.Types.ObjectId, ref: "Flashcard" },
  level: { type: Number, required: true },
  isCorrect: { type: Boolean },
});

const FlashcardStates =
  mongoose.models.FlashcardStates ||
  mongoose.model("FlashcardStates", flashcardStatesSchema);

export default FlashcardStates;
