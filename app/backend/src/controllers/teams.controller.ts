import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import mapStatusHTTP from '../utils/mapStatusHTPP';

class TeamsControllers {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  getAllTeams(req: Request, res: Response) {
    try {
      const { status, data } = this.teamsService.listAllTeams();
      res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      res.status(mapStatusHTTP('serverError')).send('Internal Server Error');
    }
  }
}

export default TeamsControllers;
