import { Request, Response, NextFunction } from 'express';
import { getAllUsers } from '../models/userModel';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
