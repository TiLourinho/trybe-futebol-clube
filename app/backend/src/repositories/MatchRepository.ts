import Model from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatch, IMatchM } from '../protocols';

class MatchRepository implements IMatchM {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAll(): Promise<IMatch[] | null> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    console.log('Repo matches', matches);
    return matches;
  }
}

export default MatchRepository;
