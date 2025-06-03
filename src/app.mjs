import express from 'express';
import dotenv from 'dotenv';
import AppError from './models/appError.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import { logger } from './middleware/logger.mjs';
import routes from './routes/blockchain-router.mjs';

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

app.use('/api/v1/blockchain', routes);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Got: http://localhost:${process.env.PORT}${req.originalUrl}`,
      404
    )
  );
});

app.use(errorHandler);

export { app };
