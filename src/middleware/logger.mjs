import Storage from '../storage.mjs';

export const logger = async (req, res, next) => {
  const message = `${req.method} ${
    req.originalUrl
  } - ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString(
    'sv-SE'
  )}`;

  try {
    const storage = new Storage('logs', 'log.txt');
    storage.writeToFile(message + '\n');
    console.log(message);
  } catch (error) {
    console.log(error);
  }

  next();
};
