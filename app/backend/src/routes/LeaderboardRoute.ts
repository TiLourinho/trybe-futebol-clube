import { Router } from 'express';
import { LeaderboardFactory } from '../utils/factory';

const leaderboardRouter: Router = Router();

leaderboardRouter.get('/home', (req, res, next) => {
  LeaderboardFactory().getAllHome(req, res, next);
});

leaderboardRouter.get('/away', (req, res, next) => {
  LeaderboardFactory().getAllAway(req, res, next);
});

leaderboardRouter.get('/', (req, res, next) => {
  LeaderboardFactory().getAllLeaderboard(req, res, next);
});

export default leaderboardRouter;
