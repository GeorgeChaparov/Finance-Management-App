
import { AppError } from "../errors/serverError";
import pool from "./db";
import { DBUser, User, UserRequest} from "@/src/types/User"

export async function getUser(requestedUser: UserRequest): Promise<DBUser> {
  try {

    const keys = Object.keys(requestedUser);
    if (keys.length !== 1) {
      throw new AppError("Exactly one filter key is required in categoryRequest", 400);
    }

    const [ key, value ] = Object.entries(requestedUser)[0];

    const [rows]: any = await pool.query(`SELECT * FROM user WHERE ${key} = ?`, [value]);
    if (!rows[0]) throw new AppError(`Cant find user with ${key}: ${value}`, 404);

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