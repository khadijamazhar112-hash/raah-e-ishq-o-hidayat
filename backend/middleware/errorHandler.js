/**
 * Noor (نور) — Global Error Handler Middleware
 */

function errorHandler(err, _req, res, _next) {
  console.error('[Noor Backend Error]', err.stack || err.message);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred on the server.';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

module.exports = {
  errorHandler,
  notFoundHandler
};
