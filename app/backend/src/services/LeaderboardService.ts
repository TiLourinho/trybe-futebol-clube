import { ILeaderboard, ILeaderboardS, ITeamM, IMatchM, IMatch } from '../protocols';
import { getLeaderboard, sortLeaderboard } from '../utils/leaderboardFunctions';

class LeaderboardService implements ILeaderboardS {
  constructor(private teamModel: ITeamM, private matchModel: IMatchM) {
    this.teamModel = teamModel;
    this.matchModel = matchModel;
  }

  async getAll(): Promise<ILeaderboard[]> {
    const teams = await this.teamModel.getAll();
    const matches = await this.matchModel.getAll(false);

    const leaderboard = teams?.map((team) => {
      const teamMatches = matches?.filter((match) => match.homeTeam === team.id) as IMatch[];
      const result = getLeaderboard(team, teamMatches);

      return result;
    });

    const sortedLeaderboard = sortLeaderboard(leaderboard as ILeaderboard[]);
    return sortedLeaderboard;
  }
}

export default LeaderboardService;
