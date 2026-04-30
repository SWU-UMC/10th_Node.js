import { pool } from "../../../db.config";

export const insertReview = async (
  storeId: number,
  userId: number,
  rating: number,
  content: string
) => {
  const [result] = await pool.query(
    `INSERT INTO review (store_id, user_id, rating, content)
     VALUES (?, ?, ?, ?)`,
    [storeId, userId, rating, content]
  );

  return result;
};

export const getStoreById = async (storeId: number) => {
  const [rows]: any = await pool.query(
    `SELECT * FROM store WHERE id = ?`,
    [storeId]
  );
  return rows[0];
};