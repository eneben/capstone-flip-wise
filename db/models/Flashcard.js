import mongoose from "mongoose";
import "./Collection";

const { Schema } = mongoose;

const flashcardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  collectionId: { type: Schema.Types.ObjectId, ref: "Collection" },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  level: { type: Number, required: true },
  isCorrect: { type: Boolean },
  imageUrl: { type: String },
});

const Flashcard =
  mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
