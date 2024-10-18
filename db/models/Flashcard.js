import mongoose from "mongoose";
import "./Collection";
import "./User";

const { Schema } = mongoose;

const flashcardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  collectionId: { type: Schema.Types.ObjectId, ref: "Collection" },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  level: { type: Number, required: true },
  isCorrect: { type: Boolean },
});

flashcardSchema.index({ userId: 1, question: 1 }, { unique: true });

const Flashcard =
  mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
