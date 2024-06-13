import mongoose, { Document, Model, Schema } from "mongoose";
import { D_User } from "./UserModel";
import { D_Post } from "./PostModel";

export interface D_Reaction extends Document {
  user: D_User;
  post: D_Post;
  reaction: "like" | "dislike";
  createdAt: Date;
  updatedAt: Date;
}

const ReactionSchema: Schema<D_Reaction> = new mongoose.Schema<D_Reaction>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    reaction: { type: String, enum: ["like", "dislike"], required: true },
  },
  { timestamps: true }
);

type ReactionModelType = Model<D_Reaction>;

export default (mongoose.models.Reaction as ReactionModelType) || mongoose.model<D_Reaction>("Reaction", ReactionSchema);
