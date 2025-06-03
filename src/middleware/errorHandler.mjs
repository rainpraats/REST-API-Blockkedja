import Storage from '../storage.mjs';

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error';
  err.success = false;
  res.status(err.statusCode).json({
    success: err.success,
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  });

  const message = `HTTP request: ${req.method} ${
    req.originalUrl
  } - ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString(
    'sv-SE'
  )}\nWhat went wrong: [Error: ${err.statusCode}], ${err.status}, ${
    err.message
  }\n\n`;

  const storage = new Storage('logs', `errors.log`);
  storage.appendToFile(message);
};
