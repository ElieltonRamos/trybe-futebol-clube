import { sign, verify } from 'jsonwebtoken';

const secretKey = process.env.SECRET || 'secret';

export interface Payload {
  id: number;
  userName: string;
  role: string;
}

class JsonWebToken {
  static generateToken(payload: Payload): string {
    return sign(payload, secretKey);
  }

  static verifyToken = (token: string): Payload | string => {
    try {
      const user = verify(token, secretKey) as Payload;
      return user;
    } catch (error) {
      return 'Token Invalido';
    }
  };
}

export default JsonWebToken;
