export interface AIResponse<T> {
  success: boolean;

  message: string;

  data: T;
}
