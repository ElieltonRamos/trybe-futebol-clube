import { compareSync } from 'bcryptjs';
import UsersModel from '../models/usersModel';
import { ServiceResponse } from '../Interfaces/IServicesResponse';
import JsonWebToken from '../utils/jsonWebToken';

class LoginService {
  constructor(
    private model = new UsersModel(),
  ) { }

  async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    if (!email || !password) {
      return { status: 'badRequest', data: { message: 'All fields must be filled' } };
    }
    const user = await this.model.findByEmail(email);
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (user === null || !compareSync(password, user.password) || !regexEmail.test(email) || password.length < 6) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const token = JsonWebToken.generateToken({ id: user.id, userName: user.username });
    return { status: 'ok', data: { token } };
  }
}

export default LoginService;
