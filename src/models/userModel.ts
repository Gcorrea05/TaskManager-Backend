import pool from './db';
import { RowDataPacket } from 'mysql2';

export interface DBUser extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface NewUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const findUserByEmail = async (email: string): Promise<DBUser | null> => {
  const [rows] = await pool.query<DBUser[]>('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
};

export const createUser = async (user: NewUser): Promise<void> => {
  await pool.query(
    'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [user.id, user.name, user.email, user.password, user.role]
  );
};
