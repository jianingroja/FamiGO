import express from 'express';
const app = express();
import router from './router';
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);

export default app;
