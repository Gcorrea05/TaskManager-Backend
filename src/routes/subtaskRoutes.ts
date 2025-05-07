import { Router } from 'express';
import { getSubtasks, createNewSubtask, updateSubtask, removeSubtask } from '../controllers/subtaskController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:taskId', authenticateToken, getSubtasks);
router.post('/:taskId', authenticateToken, createNewSubtask);
router.put('/:id', authenticateToken, updateSubtask);
router.delete('/:id/:taskId', authenticateToken, removeSubtask);

export default router;
