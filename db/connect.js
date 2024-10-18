import mongoose from "mongoose";
import Flashcard from "./models/Flashcard";
import User from "./models/User";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    await ensureIndexes();
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

const ensureIndexes = async () => {
  try {
    await Flashcard.ensureIndexes();
    await User.ensureIndexes();
    console.log("Flashcard indexes have been created");
  } catch (error) {
    console.error("Error creating Flashcard indexes:", error);
  }
};

export default dbConnect;
