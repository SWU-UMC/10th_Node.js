import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { createReviewRequest } from "../dtos/review.dto.js";

// 리뷰 추가하기
export const addReview = async (
  userId: number,
  storeId: number,
  data: createReviewRequest,
): Promise<number | null> => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query<RowDataPacket[]>(
      `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore`,
      [storeId],
    );

    if (!confirm[0]?.isExistStore) {
      return null;
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO review (user_id,store_id,body,rate) VALUES (?,?,?,?)`,
      [userId, storeId, data.body, data.rate],
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 리뷰 조회하기
export const getReview = async (reviewId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [review] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM review WHERE id = ?`,
      [reviewId],
    );

    if (review.length === 0) {
      return null;
    }

    return review[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
