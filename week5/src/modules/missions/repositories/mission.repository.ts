import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 가게 존재 여부 확인
export const getStoreById = async (storeId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM store WHERE id = ?;`,
      [storeId]
    );
    if (rows.length === 0) return null;
    return rows[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 추가
export const addMission = async (data: {
  storeId: number;
  reward: number;
  deadline: Date;
  missionSpec: string;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?);`,
      [data.storeId, data.reward, data.deadline, data.missionSpec]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 조회
export const getMission = async (missionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM mission WHERE id = ?;`,
      [missionId]
    );
    if (rows.length === 0) return null;
    return rows[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
