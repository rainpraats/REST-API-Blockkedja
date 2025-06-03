import Storage from '../storage.mjs';

export const logger = async (req, res, next) => {
  const message = `${req.method} ${
    req.originalUrl
  } - ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString(
    'sv-SE'
  )}
  `;

  const storage = new Storage('logs', 'logger.log');
  storage.appendToFile(message);

  next();
};
