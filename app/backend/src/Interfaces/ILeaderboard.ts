import { IMatchWithTeamNames } from './IMatches';
import ITeam from './ITeam';

export type ILeaderboard = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
};

export type MatchTeamSide = 'homeTeam' | 'awayTeam';

export interface InfosLeaderboard {
  matches: IMatchWithTeamNames[],
  teams: ITeam[],
  matchTeamSide: MatchTeamSide,
}

export type OptionsTeamsGoals = 'awayTeamGoals' | 'homeTeamGoals';
