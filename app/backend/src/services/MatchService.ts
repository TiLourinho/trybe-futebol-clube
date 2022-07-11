import { IMatch, IMatchM, IMatchS } from '../protocols';

class MatchService implements IMatchS {
  constructor(private model: IMatchM) {
    this.model = model;
  }

  async getAll(query: boolean | null): Promise<IMatch[]> {
    const matches = await this.model.getAll(query);

    return matches as IMatch[];
  }
}

export default MatchService;
