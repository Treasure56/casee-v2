import { ImageLayer } from "./designConfig";

export type DesignedCaseProps = {
  images: ImageLayer[];
  colorValue: string;
  modelValue: string;
};

export type CaseDetailsProps = {
  colorValue: string;
  modelValue: string;
  materialValue: string;
  finishValue: string;
};

export type OrderSummaryProps = {
  totalPrice: number;
};
