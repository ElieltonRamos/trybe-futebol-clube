import { ICRUDModel } from './ICRUD';

export default interface IUser {
  readonly id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type IUserModel = ICRUDModel<IUser>;
