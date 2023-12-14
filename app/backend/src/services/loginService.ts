import { compareSync } from 'bcryptjs';
import UsersModel from '../models/usersModel';
import { ServiceResponse } from '../Interfaces/IServicesResponse';
import JsonWebToken from '../utils/jsonWebToken';

class LoginService {
  constructor(
    private model = new UsersModel(),
  ) { }

  async validateUser(password: string, email: string) {
    const user = await this.model.findByEmail(email);
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!user || !regexEmail.test(email)) return false;
    const passwordValid = password.length < 6 || !compareSync(password, user.password);
    if (passwordValid) return false;
    return user;
  }

  async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    if (!email || !password) {
      return { status: 'badRequest', data: { message: 'All fields must be filled' } };
    }
    const validUser = await this.validateUser(password, email);
    if (!validUser) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const token = JsonWebToken.generateToken({ id: validUser.id, userName: validUser.username });
    return { status: 'ok', data: { token } };
  }
}

export default LoginService;
