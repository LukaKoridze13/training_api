import mongoose, { Document, Model, Schema } from "mongoose";
import { D_User } from "./UserModel";

export interface D_Post extends Document {
  title: string;
  content: string;
  author: D_User;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema<D_Post> = new mongoose.Schema<D_Post>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

type PostModelType = Model<D_Post>;

export default (mongoose.models.Post as PostModelType) || mongoose.model<D_Post>("Post", PostSchema);
