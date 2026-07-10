import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPasswordResetToken extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  verified: boolean;
}

const PasswordResetTokenSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // MongoDB TTL: auto-deletes when expiresAt is reached
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const PasswordResetToken: Model<IPasswordResetToken> =
  mongoose.models.PasswordResetToken ||
  mongoose.model<IPasswordResetToken>(
    "PasswordResetToken",
    PasswordResetTokenSchema,
  );

export default PasswordResetToken;
