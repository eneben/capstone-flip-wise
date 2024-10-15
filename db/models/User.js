import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  providerId: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
