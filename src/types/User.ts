import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  firebaseUid?: string;
  photoURL?: string;
  provider: "credentials" | "google";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    firebaseUid: { type: String, unique: true, sparse: true },
    photoURL: { type: String },
    provider: { type: String, enum: ["credentials", "google"], default: "credentials" },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
