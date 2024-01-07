import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTPP';
import LeaderboardServices from '../services/leaderboardService';

class leaderboardController {
  constructor(
    private leaderboardService = new LeaderboardServices(),
  ) { }

  async leaderboardSearchHome(req: Request, res: Response) {
    try {
      const { status, data } = await this.leaderboardService.searchLeaderboardHome();
      return res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      return res.status(mapStatusHTTP('serverError')).send('Internal Server Error');
    }
  }
}

export default leaderboardController;
