import { compareSync } from 'bcryptjs';
import UsersModel from '../models/usersModel';
import { ServiceResponse } from '../Interfaces/IServicesResponse';
import JsonWebToken from '../utils/jsonWebToken';

class LoginService {
  constructor(
    private model = new UsersModel(),
  ) { }

  async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    console.log('email', email, 'senha', password);
    if (!email || !password) {
      return { status: 'badRequest', data: { message: 'All fields must be filled' } };
    }
    const user = await this.model.findByEmail(email);
    if (user === null || !compareSync(password, user.password)) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const token = JsonWebToken.generateToken({ id: user.id, userName: user.username });
    return { status: 'ok', data: { token } };
  }
}

export default LoginService;
