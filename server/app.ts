import express from 'express'
const app = express();
import router from './router'
const cors = require("cors") ;


app.use(cors());
app.use(express.json());
app.use(router);


app.get('/ping', (_req,res) => {
  console.log('aaa')
  res.send('pong')
})

export default app;
