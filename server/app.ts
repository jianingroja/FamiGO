import express from 'express';
import router from './router';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(router);

export default app;
