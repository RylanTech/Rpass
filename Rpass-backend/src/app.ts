import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { db } from './models';
import userRoutes from './routes/userRoutes'
import passRoutes from './routes/passRoutes'

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// incoming requests
const cors = require('cors');
app.use(cors());

app.use('/api/user', userRoutes)
app.use('/api/pass', passRoutes)

app.use(( req: Request, res: Response, next: NextFunction ) => {
  res.status(404).send("error");
})


// Syncing DB
db.sync().then(() => {
  console.info("Connected to the database!")
});

app.listen(3001);