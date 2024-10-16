import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/config';
import authRoutes from './routes/auth';
import campaignRoutes from './routes/campaign';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);

const start = async () => {
  try {
    await sequelize.sync();
    app.listen(5000, () => console.log('Server running on port 5000'));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
