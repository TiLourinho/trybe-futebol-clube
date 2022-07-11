import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchS } from '../protocols';

class MatchController {
  constructor(private service: IMatchS) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.getAll();

      return res.status(StatusCodes.OK).json(matches);
    } catch (err) {
      next(err);
    }
  }
}

export default MatchController;
