import { HttpStatus } from "@/src/enums";
import { AppError } from "../errors/serverError";
import { ServerResponse } from "@/src/types/ServerRespons";


export const errorLogger = {
    log(error: unknown) : ServerResponse {
        if (error instanceof AppError) {
            return error.log();
        }
        else {
            console.error(error);
            return { successful: false, message: 'Internal server error', statusCode: HttpStatus.InternalServerError_500 };
        }
    }
}