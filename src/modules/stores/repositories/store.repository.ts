import { ResultSetHeader } from "mysql2";
import { pool } from "../../../db.config";

export const insertStore = async (data: any) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO store (region_id, name, category, address)
     VALUES (?, ?, ?, ?)`,
    [data.regionId, data.name, data.category, data.address]
  );

  return {
    id: result.insertId,
    regionId: data.regionId,
    name: data.name,
    category: data.category,
    address: data.address,
  };
};