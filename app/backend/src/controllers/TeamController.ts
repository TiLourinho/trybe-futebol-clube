import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeamS } from '../protocols';

class TeamController {
  constructor(private service: ITeamS) {
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

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.service.getById(Number(id));

      return res.status(StatusCodes.OK).json(team);
    } catch (err) {
      next(err);
    }
  }
}

export default TeamController;
