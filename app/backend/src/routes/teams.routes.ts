import { Request, Response, Router } from 'express';
import TeamsControllers from '../controllers/teams.controller';

const teamsRouter = Router();

const teamsController = new TeamsControllers();

teamsRouter.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));

export default teamsRouter;
