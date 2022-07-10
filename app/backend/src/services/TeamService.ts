import { ITeam, ITeamM, ITeamS } from '../protocols';

class TeamService implements ITeamS {
  constructor(private model: ITeamM) {
    this.model = model;
  }

  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.getAll();

    return teams as ITeam[];
  }

  async getById(id: number): Promise<ITeam> {
    const team = await this.model.getById(id);

    return team as ITeam;
  }
}

export default TeamService;
