import Model from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatch, IMatchM } from '../protocols';

class MatchRepository implements IMatchM {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAll(query: boolean | null): Promise<IMatch[] | null> {
    if (query === null) {
      const matches = await this.model.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });

      return matches;
    }

    const matches = await this.model.findAll({
      where: { inProgress: query },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  async create(match: IMatch): Promise<IMatch> {
    const newMatch = await this.model.create({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });

    return newMatch;
  }
}

export default MatchRepository;
