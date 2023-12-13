import { IUserModel } from '../Interfaces/IUser';
import UsersModel from '../models/usersModel';
import { ServiceResponse } from '../Interfaces/IServicesResponse';

class LoginService {
  constructor(
    private model: IUserModel = new UsersModel(),
  ) { }

  async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const token = {};
    return { status: 'ok', data: token };
  }
}

export default LoginService;
