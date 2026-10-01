import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tagRoutes from './routes/tagRoutes';
import { login } from './controllers/authController';
import projectRoutes from './routes/projectRoutes';
import educationRoutes from './routes/educationRoutes';
import certificateRoutes from './routes/certificateRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/auth/login', login);
app.use('/api/tags', tagRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/educations', educationRoutes);
app.use('/api/certificates', certificateRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});