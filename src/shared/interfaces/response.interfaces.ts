export interface IResponseSuccess {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: object;
}

export interface IResponseFailed {
  success: boolean;
  message: string;
  error_code: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: object;
}