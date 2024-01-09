import { calculateLeaderboard,
  generalLeaderboard, orderLeaderboard } from '../utils/calculateMatchResults';
import { ILeaderboard, InfosLeaderboard } from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../Interfaces/IServicesResponse';
import MatchesModel from '../models/matchesModel';
import TeamsModel from '../models/teamsModel';

class leaderboardService {
  constructor(
    private matchsModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) { }

  async searchLeaderboardHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allMatches = await this.matchsModel.findAll();
    const matchesFinished = allMatches.filter((match) => match.inProgress === false);
    const allTeams = await this.teamsModel.findAll();

    const statistics: InfosLeaderboard = {
      teams: allTeams,
      matches: matchesFinished,
      matchTeamSide: 'homeTeam',
    };

    const leadboardHome = calculateLeaderboard(statistics);

    const ordenedLeaderboard = orderLeaderboard(leadboardHome);

    return { status: 'ok', data: ordenedLeaderboard };
  }

  async searchLeaderboardAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allMatches = await this.matchsModel.findAll();
    const matchesFinished = allMatches.filter((match) => match.inProgress === false);
    const allTeams = await this.teamsModel.findAll();

    const statistics: InfosLeaderboard = {
      teams: allTeams,
      matches: matchesFinished,
      matchTeamSide: 'awayTeam',
    };

    const leadboardAway = calculateLeaderboard(statistics);

    const ordenedLeaderboard = orderLeaderboard(leadboardAway);

    return { status: 'ok', data: ordenedLeaderboard };
  }

  async searchLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allMatches = await this.matchsModel.findAll();
    const matches = allMatches.filter((match) => match.inProgress === false);
    const teams = await this.teamsModel.findAll();

    const leadboardHome = calculateLeaderboard({ matchTeamSide: 'homeTeam', teams, matches });
    const leadboardAway = calculateLeaderboard({ matchTeamSide: 'awayTeam', teams, matches });

    const leadboard = generalLeaderboard(leadboardHome, leadboardAway);

    const ordenedLeaderboard = orderLeaderboard(leadboard);

    return { status: 'ok', data: ordenedLeaderboard };
  }
}

export default leaderboardService;
