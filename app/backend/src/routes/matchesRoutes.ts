import { Request, Response, Router } from 'express';
import MatchesControllers from '../controllers/matchesController';
// import authenticateToken from '../middlewares/authenticateToken';

const matchesRouter = Router();

const MatchesController = new MatchesControllers();

matchesRouter.get('/', (req: Request, res: Response) => MatchesController.getAllMatches(req, res));

export default matchesRouter;
