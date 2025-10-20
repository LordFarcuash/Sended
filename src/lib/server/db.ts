// src/lib/server/db.ts
import mysql from 'mysql2/promise';

import {   DATABASE_HOST, 
  DATABASE_USER, 
  DATABASE_PASSWORD, 
  DATABASE_NAME,
  DATABASE_PORT } from '$env/static/private';

// Pool de conexiones para mejor rendimiento
const pool = mysql.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: Number(DATABASE_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Función helper para ejecutar queries
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

export default pool;