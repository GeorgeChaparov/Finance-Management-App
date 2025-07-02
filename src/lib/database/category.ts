import { CategoriesRequest, CategoryRequest, DBCategory } from "@/src/types/Categories";
import pool from "./db";
import { AppError } from "../errors/serverError";
import { HttpStatus } from "@/src/enums";

export async function createCategory(name: string, iconName: string, userId: string): Promise<number> {
    try {
        const [result]: any = await pool.query(`INSERT INTO category (name, iconName, userId) VALUES (?, ?, ?)`, [name, iconName, userId]);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

export async function getAllCategoriesOfUser(categoryRequest: CategoriesRequest): Promise<DBCategory[]> {
    try {
        const keys = Object.keys(categoryRequest);
        if (keys.length !== 1) {
          throw new AppError("Exactly one filter key is required in categoryRequest", HttpStatus.BadRequest_400);
        }

        const [ key, value ] = Object.entries(categoryRequest)[0];

        const [rows]: any = await pool.query(`SELECT * FROM category WHERE ${key} = ?`, [value]);
        if (!rows[0]) throw new AppError(`Cant find category matching the ${key}: ${value}`, HttpStatus.NotFound_404);

        return rows as DBCategory[];
    } catch (error) {
        throw error;
    }
}

export async function getCategoryOfUserById(categoryRequest: CategoryRequest): Promise<DBCategory[]> {
    try {
        const [rows]: any = await pool.query(`SELECT * FROM category WHERE userId = ? AND id = ?`, [categoryRequest.userId, categoryRequest.categoryId]);
        if (!rows[0]) throw new AppError(`Cant find category with id = ${categoryRequest.categoryId} and user id = ${categoryRequest.userId}`, HttpStatus.NotFound_404);

        return rows as DBCategory[];
    } catch (error) {
        throw error;
    }
}

export async function deleteCategory(categoryId: string): Promise<boolean> {
    try {
        const [result]: any = await pool.query(`DELETE FROM category WHERE id = ?`, [categoryId]);

        if (result.affectedRows === 0) {
          throw new AppError("There is no category with this Id", HttpStatus.NotFound_404);
        }

        return true;
    } catch (error) {
        throw error;
    }
}