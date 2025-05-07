import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import subtaskRoutes from './routes/subtaskRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Mensagem base
app.get('/', (req, res) => {
  res.send('🚀 Backend Task Manager rodando!');
});

// Rotas principais
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/subtasks', subtaskRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware global de erro
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor' });
});

export default app;
