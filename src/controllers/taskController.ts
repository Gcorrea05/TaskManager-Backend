import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getAllTasks, getTaskById, createTask, updateTaskProgress, deleteTask, NewTask } from '../models/taskModel';

export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);
    if (!task) {
      res.status(404).json({ message: 'Tarefa não encontrada' });
      return;
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const createNewTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, due_date, progress, assigned_to, assigned_by } = req.body;

    const newTask: NewTask = {
      id: uuidv4(),
      title,
      description,
      due_date,
      progress: progress || 0,
      assigned_to,
      assigned_by,
    };

    await createTask(newTask);
    res.status(201).json({ message: 'Tarefa criada com sucesso' });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { progress } = req.body;
    await updateTaskProgress(id, progress);
    res.json({ message: 'Progresso atualizado com sucesso' });
  } catch (error) {
    next(error);
  }
};

export const removeTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteTask(id);
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    next(error);
  }
};
