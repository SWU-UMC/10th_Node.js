import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 1. User 데이터 삽입
export const addUser = async (data: any): Promise<number | null> => {
  const conn = await pool.getConnection();

  try {
    // [confirm] 뒤에 타입 명시 (결과는 배열 형태)
    const [confirm] = await pool.query<RowDataPacket[]>(
      `SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail`,
      [data.email],
    );

    // 이제 confirm[0] 뒤에 점 찍어도 에러 나지 않음
    if (confirm[0]?.isExistEmail) {
      return null;
    }

    // 삽입 결과는 ResultSetHeader 타입 사용하기
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO member (email, name, gender, birth, address, phone_num) VALUES (?,?,?,?,?,?);`,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.phoneNum,
      ],
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 2. 사용자 정보 얻기
export const getUser = async (userId: number): Promise<any | null> => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM member WHERE id = ?;`,
      [userId],
    );

    if (user.length === 0) {
      return null;
    }

    return user[0]; // 배열의 첫 번째 요소(유저 정보) 반환)
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 3. 음식 선호 카데고리 매핑
export const setPreference = async (
  userId: number,
  foodCategoryId: number,
): Promise<void> => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO member_preference (user_id, food_category_id) VALUES (?,?);`,
      [userId, foodCategoryId],
    );
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 4. 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (
  userId: number,
): Promise<any[]> => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query<RowDataPacket[]>(
      "SELECT mp.id, mp.food_category_id, mp.user_id, fc.name " +
        "FROM member_preference mp JOIN food_category fc on mp.food_category_id = fc.id " +
        "WHERE mp.user_id = ? ORDER BY mp.food_category_id ASC;",
      [userId],
    );
    return preferences as any[];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
