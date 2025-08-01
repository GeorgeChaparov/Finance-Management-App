import pool from "./db";

export async function createTransaction(name: string, date: string, categoryId: string, note: string, isExpense: boolean, transactionMethot: string, amount: string): Promise<number> {
    try {
        const [result]: any = await pool.query(`INSERT INTO transaction (name, date, note, amount, isExpense, method, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, date, note, amount, isExpense, transactionMethot, categoryId]);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

export async function getAllTransactionsOfUser(userId: string) : Promise<number> {
    try { 
        const [rows]: any = await pool.query(`
            SELECT 
                t.id, 
                t.name, 
                DATE_FORMAT(t.date, '%Y-%m-%d') AS date,
                DATE_FORMAT(t.date, '%H:%i:%s') AS time, 
                t.note, 
                t.amount, 
                t.isExpense, 
                c.name as category, 
                c.iconName 
            FROM transaction as t 
            JOIN category as c ON t.categoryId = c.id 
            WHERE c.userId = ? 
            ORDER BY t.date 
            DESC 
            LIMIT 15
        `, [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function getAllTransactionsOfUserByMonth(userId: string, month: number) : Promise<any> {
    try { 
        const [rows]: any = await pool.query(`
            SELECT
            	CONCAT(
                  '[',
                    GROUP_CONCAT(
                      JSON_OBJECT(
                        'id',         t.id,
                        'name',       t.name,
                        'date',       DATE_FORMAT(t.date, '%Y-%m-%d'),
                        'time',       DATE_FORMAT(t.date, '%H:%i:%s'),
                        'note',       t.note,
                        'amount',     t.amount,
                        'isExpense',  t.isExpense,
                        'category',   c.name,
                        'iconName',      c.iconName
                      )
                      ORDER BY DATE_FORMAT(t.date, '%H:%i:%s')
                      DESC
                    ),
                  ']'
                ) AS transactions
            FROM transaction t
            JOIN category c ON c.id = t.categoryId
            WHERE c.userId = ? AND MONTH(t.date) = ?
            GROUP BY DATE_FORMAT(t.date, '%Y-%m-%d')
            ORDER BY DATE_FORMAT(t.date, '%Y-%m-%d')
            DESC
        `, [userId, month]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function getAllTransactionsOfUserByCategory(userId: string) : Promise<number> {
    try { 
        const [rows]: any = await pool.query(`
            SELECT
                MONTH(t.date) AS date,
                JSON_ARRAYAGG(JSON_OBJECT(
                    'id', t.id,
                    'amount', t.amount,
                    'date', t.date
                )) AS transactions
            FROM transaction t
            WHERE c.userId = ?
            GROUP BY date
            ORDER BY MAX(date);
        `, [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
}