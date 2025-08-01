"use server"

import { HttpStatus } from "@/src/enums";
import { AppError } from "../errors/serverError";
import { errorLogger } from "../loggers/errorLogger";
import { createTransaction, getAllTransactionsOfUser, getAllTransactionsOfUserByMonth } from "../database/transaction";
import { getUserIdFromCookieAction } from "./authActions";
import { ServerResponse } from "@/src/types/ServerRespons";
import { redirect } from "next/navigation";
import { PaymentMethods, PaymentType } from "@/src/types/Transaction";
import { updateUserBank, updateUserCash } from "../database/user";

export async function createTransactionAction(formData: FormData) {
    const name = formData.get("categoryName") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const categoryId = formData.get("categoryId") as string;
    const note = formData.get("note") as string;
    const transactionType = formData.get("transactionType") as string;
    const transactionMethot = formData.get("transactionMethot") as string;
    const amount = formData.get("amount") as string;

    let transactionId = null;

    try {
        if (!name || name === "") {
            throw new AppError("Please enter the name of the transaction.", HttpStatus.BadRequest_400)
        }
        else if (!date || date === "")
        {
            throw new AppError("Please select the date of the transaction.", HttpStatus.BadRequest_400)
        }
        else if (!time || time === "")
        {
            throw new AppError("Please select the time of the transaction.", HttpStatus.BadRequest_400)
        }
        else if (!categoryId || categoryId === "")
        {
            throw new AppError("Please select the category of the transaction.", HttpStatus.BadRequest_400)
        }
        else if (!transactionType || transactionType === "")
        {
            throw new AppError("Please select the transaction type of the transaction.", HttpStatus.BadRequest_400)
        }
        else if (!transactionMethot || transactionMethot === "")
        {
            throw new AppError("Please select the transaction methot of the transaction.", HttpStatus.BadRequest_400)
        }
        else if (!amount || amount === "")
        {
            throw new AppError("Please enter the amount of the transaction.", HttpStatus.BadRequest_400)
        }
        
        const userId = await getUserIdFromCookieAction();
        switch (transactionMethot as PaymentMethods) {
            case PaymentMethods.bank:
                await updateUserBank(userId, amount, transactionType as PaymentType);
                break;
            case PaymentMethods.cash:
                await updateUserCash(userId, amount, transactionType as PaymentType);
                break;
        
            default:
                break;
        }

        transactionId = await createTransaction(name, `${date} ${time}:00`, categoryId, note, transactionType == "expense", transactionMethot, amount);
        
        console.log(`New transaction named "${name}" and with id "${transactionId}" created in category with id: ${categoryId}.`);

        
    } catch (error) {
        errorLogger.log(error); 
    }

    if (transactionId !== null) {
        redirect("/");
    }
}


export async function getTransactionsByUserAction(): Promise<ServerResponse> {
  try {
    const userId = await getUserIdFromCookieAction();
    const transactions = await getAllTransactionsOfUser(userId);

    return { successful: true, data: {transactions}, statusCode: HttpStatus.OK_200 };
  } catch (error) {
    return errorLogger.log(error);    
  }
}

export async function getTransactionsByUserAndMonthAction(month: number): Promise<ServerResponse> {
  try {
    const userId = await getUserIdFromCookieAction();
    const transactionsByDate = await getAllTransactionsOfUserByMonth(userId, month);

    return { successful: true, data: transactionsByDate, statusCode: HttpStatus.OK_200 };
  } catch (error) {
    return errorLogger.log(error);    
  }
}