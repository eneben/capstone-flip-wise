import mongoose from "mongoose";
import "./Collection";

const { Schema } = mongoose;

const userSchema = new Schema({
  providerId: { type: String, required: true },
  usersCollections: { type: [Schema.Types.ObjectId], ref: "Collection" },
});

userSchema.index({ providerId: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
