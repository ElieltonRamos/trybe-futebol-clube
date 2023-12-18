import { NextFunction, Request, Response, Router } from 'express';
import LoginControllers from '../controllers/loginController';
import authenticateToken from '../middlewares/authenticateToken';

const loginRouter = Router();

const loginController = new LoginControllers();

loginRouter.post('/', (req: Request, res: Response) => loginController.login(req, res));

loginRouter.get(
  '/role',
  (req: Request, res: Response, n: NextFunction) => authenticateToken.verifyToken(req, res, n),
  (req: Request, res: Response) => loginController.role(req, res),
);

export default loginRouter;
