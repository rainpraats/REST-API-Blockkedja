import express from 'express';
import routes from './routes/blockchain-router.mjs';
import dotenv from 'dotenv';
import AppError from './models/appError.mjs';
import { logger } from './middleware/logger.mjs';
import errorHandler from './middleware/errorHandler.mjs';

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
      `Not Found. Got: http://localhost:${process.env.PORT}${req.originalUrl}`,
      404
    )
  );
});

app.use(errorHandler);

export { app };
