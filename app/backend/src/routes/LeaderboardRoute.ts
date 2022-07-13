import { Router } from 'express';
import { LeaderboardFactory } from '../utils/factory';

const leaderboardRouter: Router = Router();

leaderboardRouter.get('/home', (req, res, next) => {
  LeaderboardFactory().getAll(req, res, next);
});

export default leaderboardRouter;
