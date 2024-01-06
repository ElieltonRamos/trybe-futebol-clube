import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = Router();

const leaderboardControllers = new LeaderboardController();

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderboardControllers.leaderboardSearchHome(req, res),
);

export default leaderboardRouter;
