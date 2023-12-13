import { Request, Response, Router } from 'express';
import LoginControllers from '../controllers/loginController';

const loginRouter = Router();

const loginController = new LoginControllers();

loginRouter.post('/', (req: Request, res: Response) => loginController.login(req, res));

export default loginRouter;
