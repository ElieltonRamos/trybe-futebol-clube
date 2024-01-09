import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTPP';
import LeaderboardServices from '../services/leaderboardService';

class leaderboardController {
  constructor(
    private leaderboardService = new LeaderboardServices(),
    private InternalError = 'Internal Server Error',
  ) { }

  async leaderboardSearchHome(_req: Request, res: Response) {
    try {
      const { status, data } = await this.leaderboardService.searchLeaderboardHome();
      return res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      return res.status(mapStatusHTTP('serverError')).send(this.InternalError);
    }
  }

  async leaderboardSearchAway(_req: Request, res: Response) {
    try {
      const { status, data } = await this.leaderboardService.searchLeaderboardAway();
      return res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      return res.status(mapStatusHTTP('serverError')).send(this.InternalError);
    }
  }

  async leaderboardSearch(_req: Request, res: Response) {
    try {
      const { status, data } = await this.leaderboardService.searchLeaderboard();
      return res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      return res.status(mapStatusHTTP('serverError')).send(this.InternalError);
    }
  }
}

export default leaderboardController;
