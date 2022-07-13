import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import TeamRepository from '../repositories/TeamRepository';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';
import MatchRepository from '../repositories/MatchRepository';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const UserFactory = () => {
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);

  return controller;
};

const TeamFactory = () => {
  const repository = new TeamRepository();
  const service = new TeamService(repository);
  const controller = new TeamController(service);

  return controller;
};

const MatchFactory = () => {
  const repository = new MatchRepository();
  const service = new MatchService(repository);
  const controller = new MatchController(service);

  return controller;
};

const LeaderboardFactory = () => {
  const teamRepository = new TeamRepository();
  const matchRepository = new MatchRepository();
  const service = new LeaderboardService(teamRepository, matchRepository);
  const controller = new LeaderboardController(service);

  return controller;
};

export {
  UserFactory,
  TeamFactory,
  MatchFactory,
  LeaderboardFactory,
};
