import { compareSync } from 'bcryptjs';
import UsersModel from '../models/usersModel';
import { ServiceResponse } from '../Interfaces/IServicesResponse';
import JsonWebToken, { Payload } from '../utils/jsonWebToken';

class LoginService {
  constructor(
    private model = new UsersModel(),
  ) { }

  async validateUser(password: string, email: string) {
    const user = await this.model.findByEmail(email);
    if (!user) return false;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    switch (true) {
      case password.length < 6: return false;
      case !regexEmail.test(email): return false;
      case !compareSync(password, user.password): return false;
      default: return user;
    }
  }

  async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    if (!email || !password) {
      return { status: 'badRequest', data: { message: 'All fields must be filled' } };
    }
    const validUser = await this.validateUser(password, email);
    if (!validUser) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const payload: Payload = {
      id: validUser.id,
      userName: validUser.username,
      role: validUser.role };
    const token = JsonWebToken.generateToken(payload);
    return { status: 'ok', data: { token } };
  }
}

export default LoginService;
