import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import mapStatusHTTP from '../utils/mapStatusHTPP';

class TeamsControllers {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  async getAllTeams(req: Request, res: Response) {
    try {
      const { status, data } = await this.teamsService.listAllTeams();
      res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      res.status(mapStatusHTTP('serverError')).send('Internal Server Error');
    }
  }

  async getTeamById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, data } = await this.teamsService.listTeamById(Number(id));
      res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      res.status(mapStatusHTTP('serverError')).send('Internal Server Error');
    }
  }
}

export default TeamsControllers;
