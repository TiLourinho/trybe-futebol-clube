import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userSchema from '../schemas/userSchema';

const validateLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = userSchema.validate({ email, password });

  if (error) {
    next({ status: StatusCodes.BAD_REQUEST, message: 'All fields must be filled' });
  }
  next();
};

export default validateLogin;
