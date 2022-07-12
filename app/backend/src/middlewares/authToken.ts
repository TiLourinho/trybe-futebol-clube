import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }

    jwt.verify(authorization, secret);

    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
  }
};

export default authToken;
