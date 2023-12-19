import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import mapStatusHTTP from '../utils/mapStatusHTPP';

class MatchesControllers {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  async getAllMatches(req: Request, res: Response) {
    try {
      const { status, data } = await this.matchesService.listAllMatches();
      res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      res.status(mapStatusHTTP('serverError')).send('Internal Server Error');
    }
  }
}

export default MatchesControllers;
