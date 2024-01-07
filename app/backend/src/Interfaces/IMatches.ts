import { ICRUDModel } from './ICRUD';

export default interface IMatches {
  id?: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export type IMatchesModel = ICRUDModel<IMatches>;

export interface IMatchWithTeamNames extends IMatches {
  homeTeam: {
    teamName: string;
  };
  awayTeam: {
    teamName: string;
  };
}
