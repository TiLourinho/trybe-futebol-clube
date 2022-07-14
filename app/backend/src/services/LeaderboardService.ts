import { ILeaderboard, ILeaderboardS, ITeamM, IMatchM, IMatch } from '../protocols';
import { getLeaderboard, getAllLeaderboard, sortLeaderboard } from '../utils/leaderboardFunctions';

class LeaderboardService implements ILeaderboardS {
  constructor(private teamModel: ITeamM, private matchModel: IMatchM) {
    this.teamModel = teamModel;
    this.matchModel = matchModel;
  }

  async getAllHome(): Promise<ILeaderboard[]> {
    const teams = await this.teamModel.getAll();
    const matches = await this.matchModel.getAll(false);

    const leaderboard = teams?.map((team) => {
      const teamMatches = matches?.filter((match) => match.homeTeam === team.id) as IMatch[];
      const result = getLeaderboard(team, teamMatches, 'home');

      return result;
    });

    const sortedLeaderboard = sortLeaderboard(leaderboard as ILeaderboard[]);
    return sortedLeaderboard;
  }

  async getAllAway(): Promise<ILeaderboard[]> {
    const teams = await this.teamModel.getAll();
    const matches = await this.matchModel.getAll(false);

    const leaderboard = teams?.map((team) => {
      const teamMatches = matches?.filter((match) => match.awayTeam === team.id) as IMatch[];
      const result = getLeaderboard(team, teamMatches, 'away');

      return result;
    });

    const sortedLeaderboard = sortLeaderboard(leaderboard as ILeaderboard[]);
    return sortedLeaderboard;
  }

  async getAllLeaderboard(): Promise<ILeaderboard[]> {
    const teams = await this.teamModel.getAll();
    const matches = await this.matchModel.getAll(false);

    const leaderboard = teams?.map((team) => {
      const homeTeamMatches = matches?.filter((match) => match.homeTeam === team.id) as IMatch[];
      const awayTeamMatches = matches?.filter((match) => match.awayTeam === team.id) as IMatch[];
      const result = getAllLeaderboard(team, homeTeamMatches, awayTeamMatches);

      return result;
    });

    const sortedLeaderboard = sortLeaderboard(leaderboard as ILeaderboard[]);
    return sortedLeaderboard;
  }
}

export default LeaderboardService;
