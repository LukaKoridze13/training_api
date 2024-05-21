import mongoose, { Document, Model, Schema } from "mongoose";

export interface D_User extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<D_User> = new mongoose.Schema<D_User>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

type UserModelType = Model<D_User>;

export default (mongoose.models.User as UserModelType) || mongoose.model<D_User>("User", UserSchema);
