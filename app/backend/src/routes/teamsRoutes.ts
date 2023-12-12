import { Request, Response, Router } from 'express';
import TeamsControllers from '../controllers/teamsController';

const teamsRouter = Router();

const teamsController = new TeamsControllers();

teamsRouter.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));

teamsRouter.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default teamsRouter;
