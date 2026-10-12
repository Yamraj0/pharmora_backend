import  AppError from "../utils/AppError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  let error = err;

  // Mongoose CastError
  if (err.name === "CastError") {
    error = new AppError(
      `Invalid ${err.path}: ${err.value}`,
      400
    );
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    error = new AppError(
      `${field} already exists`,
      409
    );
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }));

    error = new AppError(
      "Validation failed",
      400,
      errors
    );
  }

  const statusCode = error.statusCode || 500;

  const response = {
    success: false,
    statusCode,
    message:
      statusCode === 500
        ? "Internal server error"
        : error.message,
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  // Only expose stack in development
  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorHandler;