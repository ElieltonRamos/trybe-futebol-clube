import { NextFunction, Request, Response } from 'express';
import JsonWebToken from '../utils/jsonWebToken';

class authenticateToken {
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send({ message: 'Token not found' });

    const decoded = JsonWebToken.verifyToken(authorization);

    if (decoded === 'Token Invalido') {
      return res.status(401).send({ message: 'Token must be a valid token' });
    }

    req.body.user = decoded;
    next();
  }
}

export default authenticateToken;
