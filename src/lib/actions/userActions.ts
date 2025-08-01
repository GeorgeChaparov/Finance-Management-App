"use server"

import { ServerResponse } from "@/src/types/ServerRespons";
import { DBUser, User, UserRequest } from "../../types/User"
import { getUser } from "../database/user";
import { errorLogger } from "../loggers/errorLogger";
import { HttpStatus } from "@/src/enums";
import { getUserIdFromCookieAction } from "./authActions";

export async function getUserAction(): Promise<ServerResponse> {
    try {
        const userId = await getUserIdFromCookieAction();
        const user = await getUser({id: userId}) as User;  
        
        return {successful: true, data:{user}, statusCode: HttpStatus.OK_200}
    } catch (error) {
        return {...errorLogger.log(error), data: {}};
    }
}