import { HttpStatus } from "../enums";

export interface ServerResponse {
  successful: boolean,
  message?: string,
  statusCode: HttpStatus,
  data?: any;
}
