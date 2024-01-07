// import IMatches from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/IServicesResponse';
import LeadboardModel from '../models/leadboardModel';

export type matchsTeamsHome = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
};

class leaderboardService {
  constructor(
    private leaderbordModel = new LeadboardModel(),
  ) { }

  async leaderboardSearchHome(): Promise<ServiceResponse<matchsTeamsHome[]>> {
    const matchsTeamsHome = await this.leaderbordModel.searchLeadboardHome();

    return { status: 'ok', data: matchsTeamsHome };
  }
}

export default leaderboardService;
