import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import mapStatusHTTP from '../utils/mapStatusHTPP';

class MatchesControllers {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  async getAllMatches(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      const { status, data } = await this.matchesService.listAllMatches(inProgress);
      res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      res.status(mapStatusHTTP('serverError')).send('Internal Server Error');
    }
  }

  async finishMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, data } = await this.matchesService.finishMatch(Number(id));
      res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      res.status(mapStatusHTTP('serverError')).send('Internal Server Error');
    }
  }
}

export default MatchesControllers;
