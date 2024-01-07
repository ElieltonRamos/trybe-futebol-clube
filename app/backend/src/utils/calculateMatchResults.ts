import ITeam from '../Interfaces/ITeam';
import { IMatchWithTeamNames } from '../Interfaces/IMatches';
import { ILeaderboardHome } from '../Interfaces/ILeaderboard';

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

  const efficiency = ((totalPoints / (matchIsHome.length * 3)) * 100).toFixed(2);
  return { totalVictories, totalDraws, totalLosses, totalPoints, efficiency };
}

export function calculateGoals(matchIsHome: IMatchWithTeamNames[]) {
  const goalsFavor = matchIsHome.reduce((goals, match) => match.homeTeamGoals + goals, 0);
  const goalsOwn = matchIsHome.reduce((goals, match) => match.awayTeamGoals + goals, 0);
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsBalance, goalsOwn, goalsFavor };
}

export function calculateLeaderboardHome(matches: IMatchWithTeamNames[], teams: ITeam[]) {
  const leadboardhome = teams.map((team) => {
    const matchIsHome = matches.filter((match) => match.homeTeam.teamName === team.teamName);

    const matchStatistics = calculateMatchStatistics(matchIsHome);

    const matchGoals = calculateGoals(matchIsHome);

    return {
      name: team.teamName,
      totalPoints: matchStatistics.totalPoints,
      totalGames: matchIsHome.length,
      totalVictories: matchStatistics.totalVictories,
      totalDraws: matchStatistics.totalDraws,
      totalLosses: matchStatistics.totalLosses,
      goalsFavor: matchGoals.goalsFavor,
      goalsOwn: matchGoals.goalsOwn,
      goalsBalance: matchGoals.goalsBalance,
      efficiency: matchStatistics.efficiency,
    };
  });

  return leadboardhome;
}

export function orderLeaderboard(leadboardHome: ILeaderboardHome[]) {
  return leadboardHome.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;

    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;

    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;

    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;

    return 0;
  });
}
