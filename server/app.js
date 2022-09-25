import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from './Routes/User.js';

import session from 'express-session';

const app = express();
const db = mongoose.connection;

app.use(
  session({
    secret: 'key123',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1500000 },
  })
);

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use('/', userRouter);

try {
  mongoose.connect('mongodb://localhost:27017/sowedane');

  db.on('error', console.error.bind(console, 'console error'));

  db.once('open', function () {
    console.log('Connected successfully');
  });
} catch (err) {
  console.log(err);
}

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(9000, () => {
  console.log('server started on port 9000');
});
