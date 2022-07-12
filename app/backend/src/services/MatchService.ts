import { IMatch, IMatchM, IMatchS } from '../protocols';

class MatchService implements IMatchS {
  constructor(private model: IMatchM) {
    this.model = model;
  }

  async getAll(query: boolean | null): Promise<IMatch[]> {
    const matches = await this.model.getAll(query);

    return matches as IMatch[];
  }

  async create(match: IMatch): Promise<object> {
    if (match.homeTeam === match.awayTeam) {
      throw new Error('Impossible match');
    }

    const newMatch = await this.model.create(match);

    return newMatch;
  }

  async update(id: number): Promise<object> {
    const match = await this.model.update(id);

    return match;
  }
}

export default MatchService;
