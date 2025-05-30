
import pool from "./db";
import { DBUser } from "@/types/Users"

export async function getUser(id: number): Promise<DBUser | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
    return rows[0] as DBUser | null;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

export async function createUser({username, email, password, preferences = {theme: "dark"}, bankAmount = 0, cashAmount = 0} : DBUser){
  try {
    const [rows]: any = await pool.query('INSERT INTO user (username, email, password, preferences, bankAmount, cashAmount) VALUES (?, ?, ?, ?, ?, ?)', [username, email, password, preferences, bankAmount, cashAmount]);
  } catch (error) {
    console.error("Database Error:", error);
  }
}