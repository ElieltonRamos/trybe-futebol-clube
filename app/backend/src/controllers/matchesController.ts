import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import mapStatusHTTP from '../utils/mapStatusHTPP';

class MatchesControllers {
  constructor(
    private matchesService = new MatchesService(),
    private internalError = 'Internal Server Error',
  ) { }

  async getAllMatches(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      const { status, data } = await this.matchesService.listAllMatches(inProgress);
      res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      res.status(mapStatusHTTP('serverError')).send(this.internalError);
    }
  }

  async finishMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, data } = await this.matchesService.finishMatch(Number(id));
      res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      res.status(mapStatusHTTP('serverError')).send(this.internalError);
    }
  }

  async updateMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { status, data } = await this.matchesService
        .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
      res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      res.status(mapStatusHTTP('serverError')).send(this.internalError);
    }
  }
}

export default MatchesControllers;
