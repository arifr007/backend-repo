import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../entities/ApiError'

/**
 * Middleware to handle errors globally in Express applications.
 * It captures instances of ApiError and sends a formatted response.
 * For errors not of type ApiError, it defaults to a 500 Internal Server Error.
 * 
 * @param {ApiError} err - The error object, expected to be an instance of ApiError.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const handleErrorMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  // Determine the status code: if the error is an instance of ApiError, use its status code; otherwise, default to 500.
  const statusCode = err.statusCode || 500

  // Send the error response with the determined status code and the error message.
  res.status(statusCode).send({
    code: err.code ?? 'INTERNAL_SERVER_ERROR',
    message: err.message,
    status: statusCode,
  })

  // Optionally, log the error or perform other error handling here.
};