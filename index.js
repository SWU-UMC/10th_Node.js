// index.js
import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));  // 로그 포맷: dev
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));


app.get('/test', (req, res) => {
  res.send('Hello!');
});
