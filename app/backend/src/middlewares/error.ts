import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error } from '../protocols';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err.message?.includes('Invalid')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;
