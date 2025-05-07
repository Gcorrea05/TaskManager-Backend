import pool from './db';
import { RowDataPacket } from 'mysql2';

export interface Subtask extends RowDataPacket {
  id: string;
  task_id: string;
  title: string;
  completed: boolean;
}

export interface NewSubtask {
  id: string;
  task_id: string;
  title: string;
  completed: boolean;
}

export const getSubtasksByTaskId = async (taskId: string): Promise<Subtask[]> => {
  const [rows] = await pool.query<Subtask[]>('SELECT * FROM subtasks WHERE task_id = ?', [taskId]);
  return rows;
};

export const createSubtask = async (subtask: NewSubtask): Promise<void> => {
  await pool.query(
    'INSERT INTO subtasks (id, task_id, title, completed) VALUES (?, ?, ?, ?)',
    [subtask.id, subtask.task_id, subtask.title, subtask.completed]
  );
};

export const updateSubtaskStatus = async (id: string, completed: boolean): Promise<void> => {
  await pool.query('UPDATE subtasks SET completed = ? WHERE id = ?', [completed, id]);
};

export const deleteSubtask = async (id: string): Promise<void> => {
  await pool.query('DELETE FROM subtasks WHERE id = ?', [id]);
};
