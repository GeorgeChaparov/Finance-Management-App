"use server"

import { HttpStatus } from "@/src/enums";
import { createCategory, deleteCategory } from "../database/category";
import { AppError } from "../errors/serverError";
import { errorLogger } from "../loggers/errorLogger";
import { getUserIdFromCookieAction } from "./authActions";
import { ServerResponse } from "@/src/types/ServerRespons";
import { revalidatePath } from "next/cache";


export async function createCategoryAction(formData: FormData) {
  const name = formData.get("name") as string;
  const iconName = formData.get("iconName") as string;

  try {
    const userId = await getUserIdFromCookieAction();
    const categoryId = await createCategory(name, iconName, userId);

    console.log(`New category named "${name}" and with id "${categoryId}" created for user with id ${userId}.`);
    return { successful: true, data: {id: categoryId, iconName, name}, statusCode: HttpStatus.Created_201};
  } catch (error) {
    return errorLogger.log(error); 
  }
}

export async function deleteCategoryAction(prevState: any, formData: FormData): Promise<ServerResponse> {
  const categoryId = formData.get("categoryId") as string;

  try {
    if (!categoryId || typeof categoryId !== 'string') {
      throw new AppError('Invalid category ID');
    }

    await deleteCategory(categoryId);

    console.log(`Category with id = ${categoryId} deleted.`);
    return { successful: true, data: {id: categoryId}, statusCode: HttpStatus.OK_200 };
  } catch (error) {
    return errorLogger.log(error);    
  }
}