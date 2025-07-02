"use server"

import { HttpStatus } from "@/src/enums";
import { createCategory, deleteCategory, getAllCategoriesOfUser, getCategoryOfUserById } from "../database/category";
import { AppError } from "../errors/serverError";
import { errorLogger } from "../loggers/errorLogger";
import { getUserIdFromCookieAction } from "./authActions";
import { ServerResponse } from "@/src/types/ServerRespons";


export async function createCategoryAction(formData: FormData) {
  const name = formData.get("name") as string;
  const iconName = formData.get("iconName") as string;

  try {

    if (!name || name === "") {
      throw new AppError("Please enter the name of the category.", HttpStatus.BadRequest_400)
    }
    else if (!iconName || iconName === "")
    {
      throw new AppError("Please select the icon of the category.", HttpStatus.BadRequest_400)
    }

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
      throw new AppError('Invalid category ID', HttpStatus.BadRequest_400);
    }

    const userId = await getUserIdFromCookieAction();
    await getCategoryOfUserById({userId, categoryId});    // If we cant find the category, the function will throw an error so we do not need to check the result.

    await deleteCategory(categoryId);

    console.log(`Category with id = ${categoryId} deleted.`);
    return { successful: true, data: {id: categoryId}, statusCode: HttpStatus.OK_200 };
  } catch (error) {
    return errorLogger.log(error);    
  }
}

export async function getCategoryAction(): Promise<ServerResponse> {
  try {
    const userId = await getUserIdFromCookieAction();
    const categories = await getAllCategoriesOfUser({userId});

    return { successful: true, data: {categories}, statusCode: HttpStatus.OK_200 };
  } catch (error) {
    return errorLogger.log(error);    
  }
}