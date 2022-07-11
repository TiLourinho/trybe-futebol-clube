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

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newMatch = await this.service.create(req.body);

      return res.status(StatusCodes.CREATED).json(newMatch);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const match = await this.service.update(Number(id));

      return res.status(StatusCodes.OK).json(match);
    } catch (err) {
      next(err);
    }
  }
}

export default MatchController;
