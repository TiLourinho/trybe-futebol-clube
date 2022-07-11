import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchS } from '../protocols';

class MatchController {
  constructor(private service: IMatchS) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;

      let query = null;
      if (inProgress === 'true') query = true;
      if (inProgress === 'false') query = false;

      const matches = await this.service.getAll(query);

      return res.status(StatusCodes.OK).json(matches);
    } catch (err) {
      next(err);
    }
  }
}

export default MatchController;
