import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import TeamRepository from '../repositories/TeamRepository';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

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

export {
  UserFactory,
  TeamFactory,
};
