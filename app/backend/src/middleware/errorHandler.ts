import { Request, Response, NextFunction } from 'express';
import { IApiResponse } from '@/types';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const response: IApiResponse = {
    success: false,
    message: statusCode === 500 ? 'Internal Server Error' : message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  };

  res.status(statusCode).json(response);
};

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const response: IApiResponse = {
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  };

  res.status(404).json(response);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
