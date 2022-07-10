import Model from '../database/models/Team';
import { ITeamM } from '../protocols';

class TeamRepository implements ITeamM {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAll(): Promise<object[]> {
    const teams = await this.model.findAll();

    return teams;
  }
}

export default TeamRepository;
