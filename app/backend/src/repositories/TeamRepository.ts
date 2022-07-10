import Model from '../database/models/Team';
import { ITeam, ITeamM } from '../protocols';

class TeamRepository implements ITeamM {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAll(): Promise<ITeam[] | null> {
    const teams = await this.model.findAll();

    return teams;
  }

  async getById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);

    return team;
  }
}

export default TeamRepository;
