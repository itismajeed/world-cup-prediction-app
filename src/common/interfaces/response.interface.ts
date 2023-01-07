export interface IResponseResult<T> {
  result: T;
  errorCode?: number;
  message?: string;
}
