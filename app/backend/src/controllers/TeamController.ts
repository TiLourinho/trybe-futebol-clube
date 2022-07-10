import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeamS } from '../protocols';

class TeamController {
  constructor(private service: ITeamS) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getAll();

      return res.status(StatusCodes.OK).json(teams);
    } catch (err) {
      next(err);
    }
  }
}

export default TeamController;
