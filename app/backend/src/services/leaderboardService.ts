import { calculateLeaderboardHome, orderLeaderboard } from '../utils/calculateMatchResults';
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
    const matchesFinished = allMatches.filter((match) => match.inProgress === false);
    const allTeams = await this.teamsModel.findAll();

    const leadboardHome = calculateLeaderboardHome(matchesFinished, allTeams);

    const ordenedLeaderboard = orderLeaderboard(leadboardHome);

    return { status: 'ok', data: ordenedLeaderboard };
  }
}

export default leaderboardService;
