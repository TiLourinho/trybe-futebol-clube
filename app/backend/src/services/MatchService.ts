import { StatusCodes } from 'http-status-codes';
import { IMatch, IMatchM, IMatchS } from '../protocols';
import TeamRepository from '../repositories/TeamRepository';
import ErrorHandler from '../utils/errorHandler';

const Team = new TeamRepository();

class MatchService implements IMatchS {
  constructor(private model: IMatchM) {
    this.model = model;
  }

  async getAll(query: boolean | null): Promise<IMatch[]> {
    const matches = await this.model.getAll(query);

    return matches as IMatch[];
  }

  async create(match: IMatch): Promise<object> {
    const homeTeam = await Team.getById(match.homeTeam);
    const awayTeam = await Team.getById(match.awayTeam);

    if (!homeTeam || !awayTeam) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }

    if (match.homeTeam === match.awayTeam) {
      throw new ErrorHandler(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }

    const newMatch = await this.model.create(match);

    return newMatch;
  }

  async updateProgress(id: number): Promise<object> {
    const match = await this.model.updateProgress(id);

    return match;
  }

  async updateResult(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<object> {
    const match = await this.model.updateResult(id, homeTeamGoals, awayTeamGoals);

    return match;
  }
}

export default MatchService;
