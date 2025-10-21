class CustomError extends Error {
  httpStatus: number;

  statusText: string;

  constructor(httpStatus: number, statusText: string) {
    super(statusText);
    this.name = "CustomError";
    this.httpStatus = httpStatus;
    this.statusText = statusText;
  }
}
export default CustomError;
