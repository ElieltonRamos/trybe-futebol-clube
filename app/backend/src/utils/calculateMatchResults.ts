import ITeam from '../Interfaces/ITeam';
import { IMatchWithTeamNames } from '../Interfaces/IMatches';

export function calculateMatchStatistics(matchIsHome: IMatchWithTeamNames[]) {
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
  return { totalVictories, totalDraws, totalLosses, totalPoints };
}

export function calculateLeaderboardHome(matches: IMatchWithTeamNames[], teams: ITeam[]) {
  const leadboardhome = teams.map((team) => {
    const matchIsHome = matches.filter((match) => match.homeTeam.teamName === team.teamName);

    const { totalDraws, totalLosses,
      totalPoints, totalVictories } = calculateMatchStatistics(matchIsHome);

    return {
      name: team.teamName,
      totalPoints,
      totalGames: matchIsHome.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor: matchIsHome.reduce((goals, match) => match.homeTeamGoals + goals, 0),
      goalsOwn: matchIsHome.reduce((goals, match) => match.awayTeamGoals + goals, 0),
    };
  });
  return leadboardhome;
}
