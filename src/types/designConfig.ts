export type DesignConfigType = {
  configId: string;
  imageUrl: string;
  ImageDimensions: { width: number; height: number };
};

export type ImageLayer = {
  id: string;
  url: string;
  width: number;
  height: number;
  x: number;
  y: number;
  renderedWidth: number;
  renderedHeight: number;
  rotation: number;
  flipH: boolean;
  flipV: boolean;
  opacity: number;
  removeBg: boolean;
};

export type SaveConfigParams = {
  configId?: string;
  imageUrl: string;
  width: number;
  height: number;
  color: string;
  model: string;
  material: string;
  finish: string;
  images: ImageLayer[];
};