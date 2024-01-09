import { IMatchWithTeamNames } from '../Interfaces/IMatches';
import { ILeaderboard, InfosLeaderboard } from '../Interfaces/ILeaderboard';

export function calculateMatchStatistics(matchesIsSide: IMatchWithTeamNames[]) {
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;

  const totalPoints = matchesIsSide.reduce((total, match) => {
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

  const efficiency = ((totalPoints / (matchesIsSide.length * 3)) * 100).toFixed(2);
  return { totalVictories, totalDraws, totalLosses, totalPoints, efficiency };
}

export function calculateGoals(matchesIsSide: IMatchWithTeamNames[]) {
  const goalsFavor = matchesIsSide.reduce((goals, match) => match.homeTeamGoals + goals, 0);
  const goalsOwn = matchesIsSide.reduce((goals, match) => match.awayTeamGoals + goals, 0);
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsBalance, goalsOwn, goalsFavor };
}

export function calculateLeaderboard({ matchTeamSide, matches, teams }: InfosLeaderboard) {
  const leadboardhome = teams.map((team) => {
    const matchesIsSide = matches.filter((m) => m[matchTeamSide].teamName === team.teamName);

    const matchStatistics = calculateMatchStatistics(matchesIsSide);

    const matchGoals = calculateGoals(matchesIsSide);

    return {
      name: team.teamName,
      totalPoints: matchStatistics.totalPoints,
      totalGames: matchesIsSide.length,
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

export function orderLeaderboard(leadboardHome: ILeaderboard[]) {
  return leadboardHome.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;

    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;

    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;

    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;

    return 0;
  });
}
