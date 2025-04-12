import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import './DB/connection.js';


const app = express();
app.use(express.json());
app.use(cors());

app.use(userRoutes);

const PORT = 5000;

app.use('/uploads', express.static('uploads'));
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});