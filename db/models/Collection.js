import mongoose from "mongoose";
import "./User";

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
