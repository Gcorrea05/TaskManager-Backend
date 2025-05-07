import pool from './db';
import { RowDataPacket } from 'mysql2';

export interface Task extends RowDataPacket {
  id: string;
  title: string;
  description: string;
  due_date: string;
  progress: number;
  assigned_to: string;
  assigned_by: string;
}

export interface NewTask {
  id: string;
  title: string;
  description: string;
  due_date: string;
  progress: number;
  assigned_to: string;
  assigned_by: string;
}

export const getAllTasks = async (): Promise<Task[]> => {
  const [rows] = await pool.query<Task[]>('SELECT * FROM tasks');
  return rows;
};

export const getTaskById = async (id: string): Promise<Task | null> => {
  const [rows] = await pool.query<Task[]>('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0] || null;
};

export const createTask = async (task: NewTask): Promise<void> => {
  await pool.query(
    'INSERT INTO tasks (id, title, description, due_date, progress, assigned_to, assigned_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [task.id, task.title, task.description, task.due_date, task.progress, task.assigned_to, task.assigned_by]
  );
};

export const updateTaskProgress = async (id: string, progress: number): Promise<void> => {
  await pool.query('UPDATE tasks SET progress = ? WHERE id = ?', [progress, id]);
};

export const deleteTask = async (id: string): Promise<void> => {
  await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
};
