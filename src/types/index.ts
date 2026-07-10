export type ActionResponse<T = unknown> = {
  error?: string;
  success?: string;
  data?: T;
  fieldErrors?: Record<string, string[]>;
};
