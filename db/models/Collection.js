import mongoose from "mongoose";

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
});

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
