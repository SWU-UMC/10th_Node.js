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

// 이미 도전 중인 미션인지 확인
export const getUserMissionByUserAndMission = async (
  userId: number,
  missionId: number
): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ? AND status = '도전중';`,
      [userId, missionId]
    );
    if (rows.length === 0) return null;
    return rows[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 도전 추가
export const addUserMission = async (data: {
  userId: number;
  missionId: number;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?);`,
      [data.userId, data.missionId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// user_mission 조회
export const getUserMission = async (userMissionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM user_mission WHERE id = ?;`,
      [userMissionId]
    );
    if (rows.length === 0) return null;
    return rows[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
