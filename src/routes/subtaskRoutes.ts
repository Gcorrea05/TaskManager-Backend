import { Router } from 'express';
import {
  getTasks,
  getTask,
  createNewTask,
  updateTask,
  removeTask,
} from '../controllers/taskController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Aplica o middleware JWT antes das rotas
router.use(authenticateToken);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createNewTask);
router.put('/:id', updateTask);
router.delete('/:id', removeTask);

export default router;
