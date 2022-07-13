import { ILeaderboard, ITeam, IMatch } from '../protocols';

const getTotalPoints = (matches: IMatch[]) => {
  const totalPoints = matches.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return totalPoints;
};

const getTotalGames = (matches: IMatch[]) => {
  const totalGames = matches.length;

  return totalGames;
};

const getTotalVictories = (matches: IMatch[]) => {
  const totalVictories = matches.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return totalVictories;
};

const getTotalDraws = (matches: IMatch[]) => {
  const totalDraws = matches.reduce((acc, curr) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return totalDraws;
};

const getTotalLosses = (matches: IMatch[]) => {
  const totalLosses = matches.reduce((acc, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return totalLosses;
};

const getGoalsFavor = (matches: IMatch[]) => {
  const goalsFavor = matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

  return goalsFavor;
};

const getGoalsOwn = (matches: IMatch[]) => {
  const goalsOwn = matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

  return goalsOwn;
};

const getGoalsBalance = (matches: IMatch[]) => {
  const goalsBalance = getGoalsFavor(matches) - getGoalsOwn(matches);

  return goalsBalance;
};

const getEfficiency = (matches: IMatch[]) => {
  const calculation = (getTotalPoints(matches) / (getTotalGames(matches) * 3)) * 100;
  const efficiency = parseFloat(calculation.toFixed(2));

  return efficiency;
};

const sortLeaderboard = (leaderboard: ILeaderboard[]) => {
  const sortedLeaderboard = leaderboard.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    return 0;
  });

  return sortedLeaderboard;
};

const getLeaderboard = (teams: ITeam, matches: IMatch[]) => {
  const result = {
    name: teams.teamName,
    totalPoints: getTotalPoints(matches),
    totalGames: getTotalGames(matches),
    totalVictories: getTotalVictories(matches),
    totalDraws: getTotalDraws(matches),
    totalLosses: getTotalLosses(matches),
    goalsFavor: getGoalsFavor(matches),
    goalsOwn: getGoalsOwn(matches),
    goalsBalance: getGoalsBalance(matches),
    efficiency: getEfficiency(matches),
  };

  return result;
};

export {
  getLeaderboard,
  sortLeaderboard,
};
