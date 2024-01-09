import { IMatchWithTeamNames } from '../Interfaces/IMatches';
import { ILeaderboard, InfoStatistics, InfosLeaderboard,
  MatchTeamSide, OptionsTeamsGoals } from '../Interfaces/ILeaderboard';

export function calculatePoints(statistics: InfoStatistics) {
  const { matchesSide, teamsGoalsFavor, teamsGoalsOwn } = statistics;

  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;

  const totalPoints = matchesSide.reduce((total, match) => {
    let teamPoints = 0;
    if (match[teamsGoalsFavor] > match[teamsGoalsOwn]) {
      teamPoints += 3;
      totalVictories += 1;
    } else if (match[teamsGoalsFavor] === match[teamsGoalsOwn]) {
      teamPoints += 1;
      totalDraws += 1;
    } else {
      totalLosses += 1;
    }
    return total + teamPoints;
  }, 0);

  return { totalVictories, totalDraws, totalLosses, totalPoints };
}

export function matchStatistics(matchesSide: IMatchWithTeamNames[], matchTeamSide: MatchTeamSide) {
  const teamsGoalsFavor = `${matchTeamSide}Goals` as OptionsTeamsGoals;
  const teamsGoalsOwn = matchTeamSide === 'homeTeam' ? 'awayTeamGoals' : 'homeTeamGoals';

  const pointsCalculate = calculatePoints({ matchesSide, teamsGoalsFavor, teamsGoalsOwn });

  const efficiency = ((pointsCalculate.totalPoints / (matchesSide.length * 3)) * 100).toFixed(2);

  return { ...pointsCalculate, efficiency };
}

export function calculateGoals(matchesIsSide: IMatchWithTeamNames[], matchTeamSide: MatchTeamSide) {
  const teamsGoalsFavor = `${matchTeamSide}Goals` as OptionsTeamsGoals;
  const teamsGoalsOwn = matchTeamSide === 'homeTeam' ? 'awayTeamGoals' : 'homeTeamGoals';

  const goalsFavor = matchesIsSide.reduce((goals, match) => match[teamsGoalsFavor] + goals, 0);
  const goalsOwn = matchesIsSide.reduce((goals, match) => match[teamsGoalsOwn] + goals, 0);
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsBalance, goalsOwn, goalsFavor };
}

export function calculateLeaderboard({ matchTeamSide, matches, teams }: InfosLeaderboard) {
  const leadboardhome = teams.map((team) => {
    const matchesIsSide = matches.filter((m) => m[matchTeamSide].teamName === team.teamName);

    const matchStatistic = matchStatistics(matchesIsSide, matchTeamSide);

    const matchGoals = calculateGoals(matchesIsSide, matchTeamSide);

    return {
      name: team.teamName,
      totalPoints: matchStatistic.totalPoints,
      totalGames: matchesIsSide.length,
      totalVictories: matchStatistic.totalVictories,
      totalDraws: matchStatistic.totalDraws,
      totalLosses: matchStatistic.totalLosses,
      goalsFavor: matchGoals.goalsFavor,
      goalsOwn: matchGoals.goalsOwn,
      goalsBalance: matchGoals.goalsBalance,
      efficiency: matchStatistic.efficiency,
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
