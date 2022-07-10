import { Router } from 'express';
import { TeamFactory } from '../utils/factory';

const teamRouter: Router = Router();

teamRouter.get('/', (req, res, next) => {
  TeamFactory().getAll(req, res, next);
});

export default teamRouter;
