/* eslint-disable max-lines-per-function */
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';

export type Team = {
  teamName: string;
};

type Match = {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: Team;
};

class LeadboardModel {
  private modelMatches = SequelizeMatchesModel;
  private modelTeams = SequelizeTeamsModel;

  async searchLeadboardHome() {
    const dbResponse = await this.modelMatches.findAll({
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
    const allTeamsHome = dbResponse.map((match) => match.dataValues) as unknown;
    const allMatches = allTeamsHome as Match[]; // buscando partidas

    const dbResTeams = await this.modelTeams.findAll();
    const allTeams = dbResTeams.map((team) => team.dataValues); // buscando times

    const leadboardTeam = allTeams.map((team) => {
      const name = team.teamName;
      const matchIsHome = allMatches.filter((match) => match.homeTeam.teamName === team.teamName);
      let totalVictories = 0;
      let totalDraws = 0;
      let totalLosses = 0;

      const totalPoints = matchIsHome.reduce((total, match) => {
        let teamPoints = 0;
        if (match.homeTeamGoals > match.awayTeamGoals) {
          teamPoints += 3;
          totalVictories += 1;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          teamPoints += 1;
          totalDraws += 1;
        } else {
          totalLosses += 1;
        }
        return total + teamPoints;
      }, 0);

      const totalGames = matchIsHome.length;

      const goalsFavor = matchIsHome.reduce((goals, match) => match.homeTeamGoals + goals, 0);

      const goalsOwn = matchIsHome.reduce((goals, match) => match.awayTeamGoals + goals, 0);

      return {
        name,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
      };
    }); // reunindo resultados

    return leadboardTeam;
  }
}

export default LeadboardModel;
