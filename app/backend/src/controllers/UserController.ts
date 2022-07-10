import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserS } from '../protocols';

class UserController {
  constructor(private service: IUserS) {
    this.service = service;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.service.login(req.body);

      return res.status(StatusCodes.OK).json({ token: user });
    } catch (err) {
      next(err);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      const role = await this.service.validate(authorization as string);

      return res.status(StatusCodes.OK).json({ role });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
