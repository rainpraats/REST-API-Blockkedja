import Storage from '../storage.mjs';

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error';
  res.status(err.statusCode).json({
    success: err.success,
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  });

  const errorLogTitle = `${
    req.method
  } request at ${new Date().toLocaleDateString(
    'sv-SE'
  )} ${new Date().toLocaleTimeString('sv-SE')} - error ${err.statusCode}`;

  const errorLogDescription = `
    HTTP request: 
    ${req.method} ${req.originalUrl} - ${new Date().toLocaleDateString(
    'sv-SE'
  )} ${new Date().toLocaleTimeString('sv-SE')}

    What went wrong: 
    [Error: ${err.statusCode}], ${err.status}, ${err.message}
  `;

  const storage = new Storage('logs', `${errorLogTitle}.log`);
  storage.writeToFile(errorLogDescription);
};
