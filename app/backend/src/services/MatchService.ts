import { IMatch, IMatchM, IMatchS } from '../protocols';
import TeamRepository from '../repositories/TeamRepository';

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
      throw new Error('Nonexistent team');
    }

    if (match.homeTeam === match.awayTeam) {
      throw new Error('Impossible match');
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
