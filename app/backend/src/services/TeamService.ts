import { ITeamM, ITeamS } from '../protocols';

class TeamService implements ITeamS {
  constructor(private model: ITeamM) {
    this.model = model;
  }

  async getAll(): Promise<object[]> {
    const teams = await this.model.getAll();

    return teams;
  }
}

export default TeamService;
