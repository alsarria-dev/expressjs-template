// Defines function to handle errors
export default function errorHandlers(app) {
  // Error handler for undefined routes i.e. no middleware matched
  app.use((req, res, next) => {
    const error = new Error(`Not found: ${req.originalUrl}`);
    error.status = 404;
    next(error);
  });

  // Error handler for internal server errors (anything that is no defined above)
  app.use((err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json({
      message: err.message || "Internal server error, check console",
    });
  });
}
