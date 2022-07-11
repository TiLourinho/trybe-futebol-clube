import { Router } from 'express';
import { MatchFactory } from '../utils/factory';

const matchRouter: Router = Router();

matchRouter.get('/', (req, res, next) => {
  MatchFactory().getAll(req, res, next);
});

matchRouter.post('/', (req, res, next) => {
  MatchFactory().create(req, res, next);
});

export default matchRouter;