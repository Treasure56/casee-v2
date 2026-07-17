import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDbImageLayer {
  id: string;
  url: string;
  width: number;
  height: number;
  x: number;
  y: number;
  renderedWidth: number;
  renderedHeight: number;
  rotation?: number;
  flipH?: boolean;
  flipV?: boolean;
  opacity?: number;
  removeBg?: boolean;
}

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
  images?: IDbImageLayer[];
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
    images: [
      {
        id: { type: String, required: true },
        url: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        renderedWidth: { type: Number, required: true },
        renderedHeight: { type: Number, required: true },
        rotation: { type: Number, default: 0 },
        flipH: { type: Boolean, default: false },
        flipV: { type: Boolean, default: false },
        opacity: { type: Number, default: 1 },
        removeBg: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Configuration: Model<IConfiguration> =
  mongoose.models.Configuration ||
  mongoose.model<IConfiguration>("Configuration", ConfigurationSchema);

export default Configuration;
