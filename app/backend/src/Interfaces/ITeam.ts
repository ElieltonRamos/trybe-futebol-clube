import { ICRUDModel } from './ICRUD';

interface ITeam {
  readonly id: number;
  teamName: string;
}

export type ITeamModel = ICRUDModel<ITeam>;

export default ITeam;
