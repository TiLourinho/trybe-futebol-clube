import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderboardS } from '../protocols';

class LeaderboardController {
  constructor(private service: ILeaderboardS) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getAll();

      return res.status(StatusCodes.OK).json(teams);
    } catch (err) {
      next(err);
    }
  }
}

export default LeaderboardController;
