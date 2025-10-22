class CustomError extends Error {
  httpStatus: number;

  constructor(httpStatus: number, message: string) {
    super(message);
    this.name = "CustomError";
    this.httpStatus = httpStatus;
  }
}
export default CustomError;
