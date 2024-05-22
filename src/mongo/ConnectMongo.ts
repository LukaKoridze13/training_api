import mongoose from "mongoose";
import UserModel from "./models/UserModel";
import PostModel from "./models/PostModel";

declare global {
  var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function ConnectMongo() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
    UserModel;
    PostModel;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default ConnectMongo;
