import { NextFunction, Request, Response, Router } from 'express';
import MatchesControllers from '../controllers/matchesController';
import authenticateToken from '../middlewares/authenticateToken';

const matchesRouter = Router();

const MatchesController = new MatchesControllers();

matchesRouter.get('/', (req: Request, res: Response) => MatchesController.getAllMatches(req, res));

matchesRouter.patch(
  '/:id',
  (req: Request, res: Response, n: NextFunction) => authenticateToken.verifyToken(req, res, n),
  (req: Request, res: Response) => MatchesController.updateMatch(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  (req: Request, res: Response, n: NextFunction) => authenticateToken.verifyToken(req, res, n),
  (req: Request, res: Response) => MatchesController.finishMatch(req, res),
);

export default matchesRouter;
