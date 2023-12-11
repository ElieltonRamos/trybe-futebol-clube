import { ICRUDModel } from './ICRUD';

export default interface IMatches {
  readonly id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export type IMatchesModel = ICRUDModel<IMatches>;
