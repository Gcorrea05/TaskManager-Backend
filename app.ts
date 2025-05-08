import userRoutes from './routes/userRoutes';

// depois dos outros app.use()
app.use('/api/users', userRoutes);
