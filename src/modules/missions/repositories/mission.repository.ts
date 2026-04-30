import { pool } from "../../../db.config";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// 미션 생성
export const insertMission = async (
  storeId: number,
  condition: string,
  rewardPoint: number
) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO mission (store_id, condition_text, reward_point)
     VALUES (?, ?, ?)`,
    [storeId, condition, rewardPoint]
  );

  return {
    id: result.insertId,
    storeId,
    condition,
    rewardPoint,
  };
};

// 이미 도전 중인지 확인
export const getUserMission = async (
  userId: number,
  missionId: number
) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM user_mission
     WHERE user_id = ? AND mission_id = ?`,
    [userId, missionId]
  );

  return rows[0];
};

// 미션 도전 추가
export const insertUserMission = async (
  userId: number,
  missionId: number
) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO user_mission (user_id, mission_id, status)
     VALUES (?, ?, 'IN_PROGRESS')`,
    [userId, missionId]
  );

  return result.insertId;
};