import { calculateLeaderboardHome } from '../utils/calculateMatchResults';
import { ILeaderboardHome } from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../Interfaces/IServicesResponse';
import MatchesModel from '../models/matchesModel';
import TeamsModel from '../models/teamsModel';

class leaderboardService {
  constructor(
    private matchsModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) { }

  async searchLeaderboardHome(): Promise<ServiceResponse<ILeaderboardHome[]>> {
    const allMatches = await this.matchsModel.findAll();
    const allTeams = await this.teamsModel.findAll();

    const leadboardHome = calculateLeaderboardHome(allMatches, allTeams);

    return { status: 'ok', data: leadboardHome };
  }
}

export default leaderboardService;
