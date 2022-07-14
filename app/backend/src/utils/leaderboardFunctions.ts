import { ILeaderboard, ITeam, IMatch } from '../protocols';

const getTotalPoints = (matches: IMatch[], fieldOfPlay: string) => {
  if (fieldOfPlay === 'home') {
    const totalPoints = matches.reduce((acc, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);

    return totalPoints;
  }
  const totalPoints = matches.reduce((acc, curr) => {
    if (curr.awayTeamGoals > curr.homeTeamGoals) return acc + 3;
    if (curr.awayTeamGoals === curr.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return totalPoints;
};

const getTotalGames = (matches: IMatch[]) => {
  const totalGames = matches.length;

  return totalGames;
};

const getTotalVictories = (matches: IMatch[], fieldOfPlay: string) => {
  if (fieldOfPlay === 'home') {
    const totalVictories = matches.reduce((acc, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);

    return totalVictories;
  }
  const totalVictories = matches.reduce((acc, curr) => {
    if (curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
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

const getTotalLosses = (matches: IMatch[], fieldOfPlay: string) => {
  if (fieldOfPlay === 'home') {
    const totalLosses = matches.reduce((acc, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);

    return totalLosses;
  }
  const totalLosses = matches.reduce((acc, curr) => {
    if (curr.awayTeamGoals < curr.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return totalLosses;
};

const getGoalsFavor = (matches: IMatch[], fieldOfPlay: string) => {
  if (fieldOfPlay === 'home') {
    const goalsFavor = matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

    return goalsFavor;
  }
  const goalsFavor = matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

  return goalsFavor;
};

const getGoalsOwn = (matches: IMatch[], fieldOfPlay: string) => {
  if (fieldOfPlay === 'home') {
    const goalsOwn = matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

    return goalsOwn;
  }
  const goalsOwn = matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

  return goalsOwn;
};

const getGoalsBalance = (matches: IMatch[], fieldOfPlay: string) => {
  const goalsBalance = getGoalsFavor(matches, fieldOfPlay) - getGoalsOwn(matches, fieldOfPlay);

  return goalsBalance;
};

const getEfficiency = (matches: IMatch[], fieldOfPlay: string) => {
  const calculation = (getTotalPoints(matches, fieldOfPlay) / (getTotalGames(matches) * 3)) * 100;
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

const getLeaderboard = (teams: ITeam, matches: IMatch[], fieldOfPlay: string) => {
  const result = {
    name: teams.teamName,
    totalPoints: getTotalPoints(matches, fieldOfPlay),
    totalGames: getTotalGames(matches),
    totalVictories: getTotalVictories(matches, fieldOfPlay),
    totalDraws: getTotalDraws(matches),
    totalLosses: getTotalLosses(matches, fieldOfPlay),
    goalsFavor: getGoalsFavor(matches, fieldOfPlay),
    goalsOwn: getGoalsOwn(matches, fieldOfPlay),
    goalsBalance: getGoalsBalance(matches, fieldOfPlay),
    efficiency: getEfficiency(matches, fieldOfPlay),
  };

  return result;
};

const getAllLeaderboard = (teams: ITeam, homeMatches: IMatch[], awayMatches: IMatch[]) => {
  const efficiencyCalculation = (
    (getTotalPoints(homeMatches, 'home') + getTotalPoints(awayMatches, 'away'))
    / ((getTotalGames(homeMatches) + getTotalGames(awayMatches)) * 3)
  ) * 100;

  const result = {
    name: teams.teamName,
    totalPoints: getTotalPoints(homeMatches, 'home') + getTotalPoints(awayMatches, 'away'),
    totalGames: getTotalGames(homeMatches) + getTotalGames(awayMatches),
    totalVictories: getTotalVictories(homeMatches, 'home') + getTotalVictories(awayMatches, 'away'),
    totalDraws: getTotalDraws(homeMatches) + getTotalDraws(awayMatches),
    totalLosses: getTotalLosses(homeMatches, 'home') + getTotalLosses(awayMatches, 'away'),
    goalsFavor: getGoalsFavor(homeMatches, 'home') + getGoalsFavor(awayMatches, 'away'),
    goalsOwn: getGoalsOwn(homeMatches, 'home') + getGoalsOwn(awayMatches, 'away'),
    goalsBalance: getGoalsBalance(homeMatches, 'home') + getGoalsBalance(awayMatches, 'away'),
    efficiency: parseFloat(efficiencyCalculation.toFixed(2)),
  };

  return result;
};

export {
  getLeaderboard,
  getAllLeaderboard,
  sortLeaderboard,
};
