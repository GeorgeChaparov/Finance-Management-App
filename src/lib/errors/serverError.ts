import { HttpStatus } from "@/src/enums";

export class AppError extends Error {
  statusCode: HttpStatus;
  cause?: unknown;

  constructor(message: string, statusCode = HttpStatus.InternalServerError_500, cause?: unknown) {
    super(message, { cause });
    this.name = "AppError";
    this.statusCode = statusCode;
    this.cause = cause;
  }

  log() {
    console.error(`message: ${this.message}, statusCode: ${this.statusCode}`);
    return {successful: false, message: this.message, statusCode: this.statusCode}
  }
}