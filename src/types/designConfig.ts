export type DesignConfigType = {
  configId: string;
  imageUrl: string;
  ImageDimensions: { width: number; height: number };
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
  x: number;
  y: number;
  renderedWidth: number;
  renderedHeight: number;
};