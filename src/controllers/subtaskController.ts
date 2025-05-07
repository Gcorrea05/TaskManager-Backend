import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getSubtasksByTaskId, createSubtask, updateSubtaskStatus, deleteSubtask, NewSubtask } from '../models/subtaskModel';
import { updateTaskProgress } from '../models/taskModel';

export const getSubtasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { taskId } = req.params;
    const subtasks = await getSubtasksByTaskId(taskId);
    res.json(subtasks);
  } catch (error) {
    next(error);
  }
};

export const createNewSubtask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { title } = req.body;

    const newSubtask: NewSubtask = {
      id: uuidv4(),
      task_id: taskId,
      title,
      completed: false,
    };

    await createSubtask(newSubtask);
    await recalculateTaskProgress(taskId);
    res.status(201).json({ message: 'Subtarefa criada com sucesso' });
  } catch (error) {
    next(error);
  }
};

export const updateSubtask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { completed, taskId } = req.body;

    await updateSubtaskStatus(id, completed);
    await recalculateTaskProgress(taskId);
    res.json({ message: 'Status da subtarefa atualizado' });
  } catch (error) {
    next(error);
  }
};

export const removeSubtask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, taskId } = req.params;

    await deleteSubtask(id);
    await recalculateTaskProgress(taskId);
    res.json({ message: 'Subtarefa deletada' });
  } catch (error) {
    next(error);
  }
};

const recalculateTaskProgress = async (taskId: string): Promise<void> => {
  const subtasks = await getSubtasksByTaskId(taskId);
  if (subtasks.length === 0) {
    await updateTaskProgress(taskId, 0);
    return;
  }
  const completedCount = subtasks.filter(st => st.completed).length;
  const progress = Math.round((completedCount / subtasks.length) * 100);
  await updateTaskProgress(taskId, progress);
};
