"use server"

import { ServerResponse } from "@/src/types/ServerRespons";
import { DBUser, User, UserRequest } from "../../types/User"
import { getUser } from "../database/user";
import { errorLogger } from "../loggers/errorLogger";
import { HttpStatus } from "@/src/enums";

export async function getUserAction(requestedUser: UserRequest): Promise<ServerResponse> {
    try {       
       const user = await getUser(requestedUser) as User;  
       return {successful: true, data:{user}, statusCode: HttpStatus.OK_200}
    } catch (error) {
        return {...errorLogger.log(error), data: {}};
    }
}