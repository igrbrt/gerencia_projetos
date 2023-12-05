export type APIPaginacao<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
};
