import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import mapStatusHTTP from '../utils/mapStatusHTPP';

class LoginControllers {
  constructor(
    private teamsService = new LoginService(),
  ) { }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { status, data } = await this.teamsService.login(email, password);
      return res.status(mapStatusHTTP(status)).send(data);
    } catch (erro) {
      console.log(erro);
      return res.status(mapStatusHTTP('serverError')).send('Internal Server Error');
    }
  }
}

export default LoginControllers;
