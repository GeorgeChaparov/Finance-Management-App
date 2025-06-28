export enum HttpStatus {
  // Success (2xx)
  OK_200 = 200,
  Created_201 = 201,
  Accepted_202 = 202,
  NoContent_204 = 204,

  // Redirection (3xx)
  MovedPermanently_301 = 301,
  Found_302 = 302,
  NotModified_304 = 304,

  // Client Errors (4xx)
  BadRequest_400 = 400,
  Unauthorized_401 = 401,
  Forbidden_403 = 403,
  NotFound_404 = 404,
  MethodNotAllowed_405 = 405,
  Conflict_409 = 409,
  Gone_410 = 410,
  UnprocessableEntity_422 = 422,
  TooManyRequests_429 = 429,

  // Server Errors (5xx)
  InternalServerError_500 = 500,
  NotImplemented_501 = 501,
  BadGateway_502 = 502,
  ServiceUnavailable_503 = 503,
  GatewayTimeout_504 = 504
}