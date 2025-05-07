import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { Request, Response, NextFunction } from 'express';
import taskRoutes from './routes/taskRoutes';
import subtaskRoutes from './routes/subtaskRoutes';




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/subtasks', subtaskRoutes);


app.get('/', (req, res) => {
  res.send('🚀 Backend Task Manager rodando!');
});

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Middleware global de erro (opcional)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor' });
});
export default app;
