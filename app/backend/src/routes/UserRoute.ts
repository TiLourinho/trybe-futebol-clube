import { Router } from 'express';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

const userFactory = () => {
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);

  return controller;
};

const userRouter: Router = Router();

userRouter.post('/', (req, res, next) => {
  userFactory().login(req, res, next);
});

export default userRouter;
