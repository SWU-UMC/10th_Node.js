import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { createMissionRequest } from "../dtos/mission.dto.js";

export const addMission = async (
  storeId: number,
  data: createMissionRequest,
): Promise<any | null> => {
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
      `INSERT INTO mission (store_id, title, body, reward) VALUES (?,?,?,?)`,
      [storeId, data.title, data.body, data.reward],
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
    const [mission] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM mission WHERE id = ?`,
      [missionId],
    );

    if (mission.length === 0) {
      return null;
    }

    return mission[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 도전 중인 미션 추가
export const addMemberMission = async (
  userId: number,
  missionId: number,
): Promise<any | null> => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query<RowDataPacket[]>(
      `SELECT EXISTS(SELECT 1 FROM mission WHERE id = ?) as isExistMission`,
      [missionId],
    );

    if (!confirm[0]?.isExistMission) {
      return null;
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO member_mission (member_id, mission_id, status) VALUES (?,?,?)`,
      [userId, missionId, "CHALLENGING"],
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 도전 중인 미션 조회
export const getMemberMission = async (
  memberMissionId: number,
): Promise<any | null> => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM member_mission WHERE id = ?`,
      [memberMissionId],
    );

    if (mission.length === 0) {
      return null;
    }

    return mission[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
