
import pool from "./db";
import { DBUser, User} from "@/types/Users"

export async function getUserById(id: number): Promise<DBUser | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
    return rows[0] as DBUser | null;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<DBUser | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM user WHERE id = ?', [email]);
    return rows[0] as DBUser | null;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

export async function createUser(username: string, email: string, password: string){
  const preferences = JSON.stringify({theme: "dark"});
  const bankAmount = 0;
  const cashAmount = 0;
  
  try {
    const [result]: any = await pool.query('INSERT INTO user (username, email, password, preferences, bankAmount, cashAmount) VALUES (?, ?, ?, ?, ?, ?)', [username, email, password, preferences, bankAmount, cashAmount]);
    return result.insertedId;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}