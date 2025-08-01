
import { HttpStatus } from "@/src/enums";
import { AppError } from "../errors/serverError";
import pool from "./db";
import { DBUser, UserRequest} from "@/src/types/User"
import { PaymentType } from "@/src/types/Transaction";

export async function getUser(requestedUser: UserRequest): Promise<DBUser> {
  try {

    const keys = Object.keys(requestedUser);
    if (keys.length !== 1) {
      throw new AppError("Exactly one filter key is required in categoryRequest",  HttpStatus.BadRequest_400);
    }

    const [ key, value ] = Object.entries(requestedUser)[0];

    const [rows]: any = await pool.query(`SELECT * FROM user WHERE ${key} = ?`, [value]);
    if (!rows[0]) throw new AppError(`Cant find user with ${key}: ${value}`, HttpStatus.NotFound_404);

    return rows[0] as DBUser;
  } catch (error) {
    throw error;
  }
}

export async function createUser(username: string, email: string, password: string):Promise<string>{
  const preferences = JSON.stringify({theme: "dark"});
  const bankAmount = 0;
  const cashAmount = 0;
  
  try {
    const [result]: any = await pool.query('INSERT INTO user (username, email, password, preferences, bankAmount, cashAmount) VALUES (?, ?, ?, ?, ?, ?)', [username, email, password, preferences, bankAmount, cashAmount]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export async function updateUserBank(userId: string, amount: string, transactionType: PaymentType):Promise<void>{
  try {
    switch (transactionType) {
      case PaymentType.expense:
        await pool.query('UPDATE user SET bankAmount = bankAmount - ? WHERE id = ?', [amount, userId]);
        break;
      case PaymentType.income: 
        await pool.query('UPDATE user SET bankAmount = bankAmount + ? WHERE id = ?', [amount, userId]);
        break;
    
      default:
        break;
    }
  } catch (error) {
    throw error;
  }
}

export async function updateUserCash(userId: string, amount: string, transactionType: PaymentType):Promise<void>{
  try {
    switch (transactionType) {
      case PaymentType.expense:
        await pool.query('UPDATE user SET cashAmount = cashAmount - ? WHERE id = ?', [amount, userId]);
        break;
      case PaymentType.income: 
        await pool.query('UPDATE user SET cashAmount = cashAmount + ? WHERE id = ?', [amount, userId]);
        break;
    
      default:
        break;
    }
  } catch (error) {
    throw error;
  }
}