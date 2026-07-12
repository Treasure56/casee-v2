import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConfiguration extends Document {
  imageUrl: string;
  width: number;
  height: number;
  color?: string;
  phoneModel?: string;
  material?: string;
  finish?: string;
  x?: number;
  y?: number;
  renderedWidth?: number;
  renderedHeight?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ConfigurationSchema: Schema = new Schema(
  {
    imageUrl: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    color: { type: String },
    phoneModel: { type: String },
    material: { type: String },
    finish: { type: String },
    x: { type: Number },
    y: { type: Number },
    renderedWidth: { type: Number },
    renderedHeight: { type: Number },
  },
  { timestamps: true }
);

const Configuration: Model<IConfiguration> =
  mongoose.models.Configuration ||
  mongoose.model<IConfiguration>("Configuration", ConfigurationSchema);

export default Configuration;
