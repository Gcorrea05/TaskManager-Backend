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

router.use(authenticateToken); // Protege todas as rotas abaixo

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createNewTask);
router.put('/:id', updateTask);
router.delete('/:id', removeTask);

export default router;