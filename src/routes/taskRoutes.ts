import { Router } from 'express';
import { getTasks, getTask, createNewTask, updateTask, removeTask } from '../controllers/taskController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getTasks);
router.get('/:id', authenticateToken, getTask);
router.post('/', authenticateToken, createNewTask);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, removeTask);

export default router;
